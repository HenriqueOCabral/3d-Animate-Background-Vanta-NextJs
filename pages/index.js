import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef, useEffect } from "react";
import React from "react";
import NET from "vanta/dist/vanta.net.min.js";
import * as THREE from "three";

import styles from '../styles/Home.module.css'

import {
  motion,
  useViewportScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export default function Home() {

    const text = 'Coming Soon...'


    const sentence = {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: {
          delay: 1.2,
          staggerChildren: 0.3
        }
      }
    }

    const letter = {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0
      }
    }

    const [vantaEffect, setVantaEffect] = useState(0);

    const vantaRef = useRef(null);

    useEffect(() => {
      if (!vantaEffect) {
        setVantaEffect(
          NET({
            THREE,
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0xff0505,
            backgroundColor: 0x0,
            points: 20.0,
            maxDistance: 15.0,
          })
        );
      }
      return () => {
        if (vantaEffect) vantaEffect.destroy();
      };
    }, [vantaEffect]);
  return (
    <div className={styles.container} ref={vantaRef}>
      <Head>
        <title>Allejo Superstars NFT</title>
        <meta name="description" content="Your new best collection mania" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.call}>
        <h1 className={styles.header}></h1>
        <h4 className={styles.sub}></h4>
        <motion.h6
          className={styles.subMov}
          variants={sentence}
          initial="hidden"
          animate="visible"
        >
          {text.split("").map((char, index) => {
            return (
              <motion.span key={char + "-" + index} variants={letter}>
                {char}
              </motion.span>
            );
          })}
        </motion.h6>
        <Link href="https://twitter.com/Allejo_NFT">
          <motion.button
            className={styles.btn}
            animate={{
              scale: [1.1, 1, 1.2, 1.1, 1],
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          >
            <Image
              className={styles.image}
              src="/twitter.png"
              alt="twt"
              width={55}
              height={55}
              layout="fixed"
            />
          </motion.button>
        </Link>
      </main>
    </div>
  );
}
