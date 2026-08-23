"use client";
import { Application, SplineEvent } from "@splinetool/runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { Suspense, useEffect, useRef, useState } from "react";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

import { useTheme } from "next-themes";
import type { Skill, SkillNames } from "@/data/constants";
import { useMediaQuery } from "@/hooks/use-media-query";
import { SKILLS } from "@/data/keyboard-skills";
import { usePauseOnHidden } from "@/hooks/use-pause-on-hidden";
import { usePerfProfile } from "@/hooks/use-perf-profile";
import { useSounds } from "@/hooks/use-sounds";
import { sleep } from "@/utils/utils";
import { getKeyboardState, Section } from "./animated-background-config";
import { usePreloader } from "./preloader";

gsap.registerPlugin(ScrollTrigger);

type SplineVariableName = "heading" | "desc";

function hasSplineVariable(app: Application, name: SplineVariableName) {
  const appWithInternals = app as unknown as {
    _getVariableByName?: (variableName: string) => unknown;
  };

  if (typeof appWithInternals._getVariableByName === "function") {
    return appWithInternals._getVariableByName(name) !== undefined;
  }

  return app.getVariable(name) !== undefined;
}

function setSplineVariable(
  app: Application,
  name: SplineVariableName,
  value: string,
) {
  if (hasSplineVariable(app, name)) {
    app.setVariable(name, value);
  }
}

function setSplineKeyboardText(
  app: Application,
  heading: string,
  desc: string,
) {
  setSplineVariable(app, "heading", heading);
  setSplineVariable(app, "desc", desc);
}

type SplineObject = NonNullable<ReturnType<Application["findObjectByName"]>>;

function animateKeyboardTo(
  kbd: SplineObject,
  section: Section,
  isMobile: boolean,
) {
  const state = getKeyboardState({ section, isMobile });
  gsap.to(kbd.scale, {
    ...state.scale,
    duration: 1,
    ease: "power2.out",
    overwrite: "auto",
  });
  gsap.to(kbd.position, {
    ...state.position,
    duration: 1,
    ease: "power2.out",
    overwrite: "auto",
  });
  gsap.to(kbd.rotation, {
    ...state.rotation,
    duration: 1,
    ease: "power2.out",
    overwrite: "auto",
  });
}

const KeyboardScene = ({ maxDpr }: { maxDpr: number }) => {
  const { isLoading, bypassLoading } = usePreloader();
  const { theme } = useTheme();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const splineContainer = useRef<HTMLDivElement>(null);
  const [splineApp, setSplineApp] = useState<Application>();
  const selectedSkillRef = useRef<Skill | null>(null);

  const { playPressSound, playReleaseSound } = useSounds();

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("hero");

  // Animation controllers refs
  const bongoAnimationRef = useRef<{ start: () => void; stop: () => void }>(
    null,
  );
  const keycapAnimationsRef = useRef<{ start: () => void; stop: () => void }>(
    null,
  );

  const [keyboardRevealed, setKeyboardRevealed] = useState(false);

  // --- Event Handlers ---

  const handleMouseHover = (e: SplineEvent) => {
    if (!splineApp || selectedSkillRef.current?.name === e.target.name) return;

    if (e.target.name === "body" || e.target.name === "platform") {
      if (selectedSkillRef.current) playReleaseSound();
      setSelectedSkill(null);
      selectedSkillRef.current = null;
      setSplineKeyboardText(splineApp, "", "");
    } else {
      if (
        !selectedSkillRef.current ||
        selectedSkillRef.current.name !== e.target.name
      ) {
        const skill = SKILLS[e.target.name as SkillNames];
        if (skill) {
          if (selectedSkillRef.current) playReleaseSound();
          playPressSound();
          setSelectedSkill(skill);
          selectedSkillRef.current = skill;
        }
      }
    }
  };

  // --- Animation Setup Helpers ---

  const createSectionTimeline = (
    triggerId: string,
    targetSection: Section,
    prevSection: Section,
    start: string = "top 50%",
    end: string = "bottom bottom",
  ) => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    // No tweens are added to this timeline itself — the actual animation is
    // the discrete onEnter/onLeaveBack state machine below, so there's
    // nothing for `scrub` to scrub.
    return gsap.timeline({
      scrollTrigger: {
        trigger: triggerId,
        start,
        end,
        onEnter: () => {
          setActiveSection(targetSection);
          animateKeyboardTo(kbd, targetSection, isMobile);
        },
        onLeaveBack: () => {
          setActiveSection(prevSection);
          animateKeyboardTo(kbd, prevSection, isMobile);
        },
      },
    });
  };

  const setupScrollAnimations = (): gsap.core.Timeline[] => {
    if (!splineApp || !splineContainer.current) return [];
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return [];

    // Initial state
    const heroState = getKeyboardState({ section: "hero", isMobile });
    gsap.set(kbd.scale, heroState.scale);
    gsap.set(kbd.position, heroState.position);

    // Section transitions
    return [
      createSectionTimeline("#skills", "skills", "hero"),
      createSectionTimeline("#experience", "experience", "skills", "top 70%"),
      createSectionTimeline("#projects", "projects", "experience", "top 70%"),
    ].filter(Boolean) as gsap.core.Timeline[];
  };

  const getBongoAnimation = () => {
    const framesParent = splineApp?.findObjectByName("bongo-cat");
    const frame1 = splineApp?.findObjectByName("frame-1");
    const frame2 = splineApp?.findObjectByName("frame-2");

    if (!frame1 || !frame2 || !framesParent) {
      return { start: () => {}, stop: () => {} };
    }

    let interval: NodeJS.Timeout;
    const start = () => {
      let i = 0;
      framesParent.visible = true;
      interval = setInterval(() => {
        if (i % 2) {
          frame1.visible = false;
          frame2.visible = true;
        } else {
          frame1.visible = true;
          frame2.visible = false;
        }
        i++;
      }, 100);
    };
    const stop = () => {
      clearInterval(interval);
      framesParent.visible = false;
      frame1.visible = false;
      frame2.visible = false;
    };
    return { start, stop };
  };

  const getKeycapsAnimation = () => {
    if (!splineApp) return { start: () => {}, stop: () => {} };

    // Resolve each skill's keycap object once (same pattern as the bongo
    // animation above) instead of re-running findObjectByName for every
    // skill on every start()/stop() call — those fire on each section
    // crossing while scrolling.
    const keycaps = Object.values(SKILLS)
      .map((skill) => splineApp.findObjectByName(skill.name))
      .filter((keycap): keycap is NonNullable<typeof keycap> => !!keycap);

    let tweens: gsap.core.Tween[] = [];
    const removePrevTweens = () => {
      tweens.forEach((t) => t.kill());
      tweens = [];
    };

    const start = () => {
      removePrevTweens();
      [...keycaps]
        .sort(() => Math.random() - 0.5)
        .forEach((keycap, idx) => {
          const t = gsap.to(keycap.position, {
            y: Math.random() * 200 + 200,
            duration: Math.random() * 2 + 2,
            delay: idx * 0.6,
            repeat: -1,
            yoyo: true,
            yoyoEase: "none",
            ease: "elastic.out(1,0.3)",
            overwrite: "auto",
          });
          tweens.push(t);
        });
    };

    const stop = () => {
      removePrevTweens();
      keycaps.forEach((keycap) => {
        const t = gsap.to(keycap.position, {
          y: 0,
          duration: 1.4,
          ease: "elastic.out(1,0.7)",
          overwrite: "auto",
        });
        tweens.push(t);
      });
    };

    return { start, stop };
  };

  const updateKeyboardTransform = async () => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    kbd.visible = false;
    await sleep(400);
    kbd.visible = true;
    setKeyboardRevealed(true);

    const currentState = getKeyboardState({ section: activeSection, isMobile });
    gsap.fromTo(
      kbd.scale,
      { x: 0.01, y: 0.01, z: 0.01 },
      {
        ...currentState.scale,
        duration: 1.5,
        ease: "elastic.out(1, 0.6)",
      },
    );

    const allObjects = splineApp.getAllObjects();
    const keycaps = allObjects.filter((obj) => obj.name === "keycap");

    await sleep(900);

    // Desktop-only icon overlay; the scene no longer ships "keycap-mobile"
    // objects (the base "keycap" reveal below already covers mobile).
    if (!isMobile) {
      const desktopKeyCaps = allObjects.filter(
        (obj) => obj.name === "keycap-desktop",
      );
      desktopKeyCaps.forEach(async (keycap, idx) => {
        await sleep(idx * 70);
        keycap.visible = true;
      });
    }

    keycaps.forEach(async (keycap, idx) => {
      keycap.visible = false;
      await sleep(idx * 70);
      keycap.visible = true;
      gsap.fromTo(
        keycap.position,
        { y: 200 },
        { y: 50, duration: 0.5, delay: 0.1, ease: "bounce.out" },
      );
    });
  };

  // --- Effects ---

  // Register Spline keyboard/mouse interaction listeners once per app
  // instance. Kept in its own effect (keyed on splineApp alone, not
  // isMobile) so switching breakpoints doesn't re-run it and stack
  // duplicate listeners on the long-lived splineApp.
  useEffect(() => {
    if (!splineApp) return;

    const isInputFocused = () => {
      const activeElement = document.activeElement;
      return (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          (activeElement as HTMLElement).isContentEditable)
      );
    };

    const onKeyUp = () => {
      if (isInputFocused()) return;
      playReleaseSound();
      setSplineKeyboardText(splineApp, "", "");
    };

    const onKeyDown = (e: SplineEvent) => {
      if (isInputFocused()) return;
      const skill = SKILLS[e.target.name as SkillNames];
      if (skill) {
        playPressSound();
        setSelectedSkill(skill);
        selectedSkillRef.current = skill;
        setSplineKeyboardText(splineApp, skill.label, skill.shortDescription);
      }
    };

    splineApp.addEventListener("keyUp", onKeyUp);
    splineApp.addEventListener("keyDown", onKeyDown);
    splineApp.addEventListener("mouseHover", handleMouseHover);

    return () => {
      splineApp.removeEventListener("keyUp", onKeyUp);
      splineApp.removeEventListener("keyDown", onKeyDown);
      splineApp.removeEventListener("mouseHover", handleMouseHover);
    };
  }, [splineApp]);

  // Initialize GSAP animations
  useEffect(() => {
    if (!splineApp) return;
    const timelines = setupScrollAnimations();
    bongoAnimationRef.current = getBongoAnimation();
    keycapAnimationsRef.current = getKeycapsAnimation();
    return () => {
      bongoAnimationRef.current?.stop();
      keycapAnimationsRef.current?.stop();
      // Kill the section ScrollTriggers so they don't orphan when the scene
      // unmounts (e.g. navigating away from the home page) and fire on the
      // disposed app.
      timelines.forEach((tl) => {
        tl.scrollTrigger?.kill();
        tl.kill();
      });
    };
  }, [splineApp, isMobile]);

  // Handle keyboard text visibility based on theme and section
  useEffect(() => {
    if (!splineApp) return;
    const textDesktopDark = splineApp.findObjectByName("text-desktop-dark");
    const textDesktopLight = splineApp.findObjectByName("text-desktop");
    const textMobileDark = splineApp.findObjectByName("text-mobile-dark");
    const textMobileLight = splineApp.findObjectByName("text-mobile");

    if (
      !textDesktopDark ||
      !textDesktopLight ||
      !textMobileDark ||
      !textMobileLight
    )
      return;

    const setVisibility = (
      dDark: boolean,
      dLight: boolean,
      mDark: boolean,
      mLight: boolean,
    ) => {
      textDesktopDark.visible = dDark;
      textDesktopLight.visible = dLight;
      textMobileDark.visible = mDark;
      textMobileLight.visible = mLight;
    };

    if (activeSection !== "skills") {
      setVisibility(false, false, false, false);
    } else if (theme === "dark") {
      if (isMobile) {
        setVisibility(false, false, false, true);
      } else {
        setVisibility(false, true, false, false);
      }
    } else {
      if (isMobile) {
        setVisibility(false, false, true, false);
      } else {
        setVisibility(true, false, false, false);
      }
    }
  }, [theme, splineApp, isMobile, activeSection]);

  useEffect(() => {
    if (!selectedSkill || !splineApp) return;
    setSplineKeyboardText(
      splineApp,
      selectedSkill.label,
      selectedSkill.shortDescription,
    );
  }, [selectedSkill, splineApp]);

  // Handle rotation and teardown animations based on active section
  useEffect(() => {
    if (!splineApp) return;

    let rotateKeyboard: gsap.core.Tween | undefined;
    let experienceKeyboardLoop: gsap.core.Tween | undefined;
    let cancelled = false;

    const kbd = splineApp.findObjectByName("keyboard");

    if (kbd) {
      rotateKeyboard = gsap.to(kbd.rotation, {
        y: Math.PI * 2 + kbd.rotation.y,
        duration: 10,
        repeat: -1,
        yoyo: true,
        yoyoEase: true,
        ease: "back.inOut",
        delay: 2.5,
        overwrite: "auto",
        paused: true, // Start paused
      });
    }

    const startExperienceKeyboardLoop = () => {
      if (!kbd) return;
      experienceKeyboardLoop?.kill();
      experienceKeyboardLoop = gsap.to(kbd.rotation, {
        x: kbd.rotation.x - Math.PI / 18,
        y: kbd.rotation.y - Math.PI / 8,
        duration: 5,
        repeat: -1,
        yoyo: true,
        yoyoEase: true,
        ease: "sine.inOut",
        overwrite: "auto",
      });
    };

    const manageAnimations = async () => {
      // Reset text if not in skills
      if (activeSection !== "skills") {
        setSplineKeyboardText(splineApp, "", "");
      }

      // Handle Rotate/Teardown Tweens
      if (activeSection === "hero") {
        rotateKeyboard?.restart();
        experienceKeyboardLoop?.pause();
      } else if (activeSection === "experience") {
        rotateKeyboard?.pause();
      } else {
        rotateKeyboard?.pause();
        experienceKeyboardLoop?.pause();
      }

      // Handle Bongo Cat
      if (activeSection === "projects") {
        await sleep(300);
        if (cancelled) return;
        bongoAnimationRef.current?.start();
      } else {
        await sleep(200);
        if (cancelled) return;
        bongoAnimationRef.current?.stop();
      }

      // Handle Experience Section keycap pop animation
      if (activeSection === "experience") {
        await sleep(1100);
        if (cancelled) return;
        startExperienceKeyboardLoop();
        keycapAnimationsRef.current?.start();
      } else {
        await sleep(600);
        if (cancelled) return;
        experienceKeyboardLoop?.pause();
        keycapAnimationsRef.current?.stop();
      }
    };

    manageAnimations();

    return () => {
      cancelled = true;
      rotateKeyboard?.kill();
      experienceKeyboardLoop?.kill();
    };
  }, [activeSection, splineApp]);

  // Reveal keyboard on load/route change
  useEffect(() => {
    // Rebuild the URL from the current pathname so the hash is always *replaced*
    // rather than appended. Using router.push("/" + hash) stacked fragments on
    // refresh (e.g. "/#skills#skills#skills") because the existing hash in the
    // address bar was never stripped first. replaceState also avoids polluting
    // browser history with an entry per scrolled-through section.
    const hash = activeSection === "hero" ? "" : `#${activeSection}`;
    const url = window.location.pathname + window.location.search + hash;
    window.history.replaceState(window.history.state, "", url);

    if (!splineApp || isLoading || keyboardRevealed) return;
    updateKeyboardTransform();
  }, [splineApp, isLoading, activeSection]);

  // Cap the renderer's pixel ratio once the scene is ready, and clean up the
  // resize listener on unmount / DPR change (previously added in onLoad and
  // never removed).
  useEffect(() => {
    if (!splineApp) return;
    return capSplinePixelRatio(splineApp, maxDpr);
  }, [splineApp, maxDpr]);

  // Pause the entire WebGL render loop (and the keyboard's infinite tweens /
  // bongo-cat interval, which are only visible through it) while the tab is
  // hidden. Spline keeps rendering at full tilt in a background tab otherwise —
  // a pointless, continuous GPU/battery drain.
  usePauseOnHidden(
    () => splineApp?.stop(),
    () => splineApp?.play(),
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Spline
        className="w-full h-full fixed"
        ref={splineContainer}
        onLoad={(app: Application) => {
          setSplineApp(app);
          bypassLoading();
        }}
        // scene="/assets/skills-keyboard.spline"
        scene="https://prod.spline.design/2tuMcvcNm5jiAsa6/scene.splinecode"
      />
    </Suspense>
  );
};

/**
 * Gate the heavy WebGL scene on `ready` so it mounts only after device
 * detection has run. That avoids a flash-mount that would fetch the heavy
 * runtime chunk + scene before we know the right pixel-ratio cap, and avoids an
 * SSR/CSR mismatch. KeyboardScene owns the whole Spline / GSAP / ScrollTrigger
 * lifecycle, so once mounted it stays mounted for the life of the page.
 */
const AnimatedBackground = () => {
  const { maxDpr, ready } = usePerfProfile();
  if (!ready) return null;
  return <KeyboardScene maxDpr={maxDpr} />;
};

/**
 * Cap the Spline/Three.js renderer's pixel ratio. The scene is published with
 * pixelRatio=0 ("device"), so on a 2–3x screen it renders 4–9x the pixels of a
 * 1x canvas — a huge GPU cost. We clamp it and reapply on resize, since Spline
 * re-reads devicePixelRatio when the canvas resizes. Returns a disposer that
 * removes the resize listener (so it isn't leaked across reloads/unmounts).
 */
function capSplinePixelRatio(app: Application, maxDpr: number) {
  const apply = () => {
    try {
      const renderer = (
        app as unknown as {
          _renderer?: { setPixelRatio?: (n: number) => void };
        }
      )._renderer;
      if (renderer?.setPixelRatio) {
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDpr));
      }
    } catch {
      /* internal API moved — fail silent, scene still renders */
    }
  };
  apply();
  // Cheap per call, but still no reason to run it dozens of times a second
  // while a window edge is being dragged — settle on the final size.
  let timeout: ReturnType<typeof setTimeout>;
  const onResize = () => {
    clearTimeout(timeout);
    timeout = setTimeout(apply, 150);
  };
  window.addEventListener("resize", onResize, { passive: true });
  return () => {
    clearTimeout(timeout);
    window.removeEventListener("resize", onResize);
  };
}

export default AnimatedBackground;
