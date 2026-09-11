'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const paragraphs = [
  `Hey Zuzu, I know I have lost a lot of respect and trust from you, you feel like I don't prioritize you anymore. I am firstly genuinely and completely heartfully sorry Zuzu for making you feel like that. See Zuzu, you really, really mean so much to me. I was really hurt by the words when I heard ki you don't care whether I give time or not. It's not because of why you told me that, it's because of why I have become like this, like my own girlfriend tells me all this. Then ultimately I understood what wrong I am doing. It's like I really, really don't understand why always do I keep hurting you babbb. From the past few days, I tried, I tried my best ki yaar aapko acha feel karwau, aapko thoda un sab se dur le aake aapko thoda khush rakhu. But wapis mai wahi chhod de rha hu, and at this point, I really know ki bhai mere kehne se bhi kuch farak he nahi padne wala.`,
  `See babbb, mai batata hu. Mereko woh din yaad hai jab apan initially talking stage mein the, apan mast baat karte the, ek dusre ko pasand karte the, then dheere dheere apan close hue, finally first date pe apna pyaar hua and all.`,
  `See, mai aaj bhi aapko wahi nazar se dekhta hu. Woh pyaari skin aapki, cute cute si smile, bacho wali harkatein, itni pyaari aankhein... yaar mai toh mast proud and confidence ke saath rehta ghumta hu aapke saath jab bhi rehta. Ki bhai dekhlo sab, yeh meri bandi hai. Haa meri, itni sundar si ladki meri bandi hai. Sahi mein yeh feel sachi mein rehta mereko toh.`,
  `Awwlee babiee, suno, rahi baat time ki, mai aur zyada se dhyaan rakhunga baby is cheez ka pakkaa... ki mai aapko aage in sab cheez, matlab aapko time dene ka and aapko yeh doubt toh kabhi nahi aane dunga beta ab toh ki yeh banda meri value nahi karta. Dekho bhale mai aur cheezo mein involved hu, dekho abhi toh Janmashtami, Chaturthi ka chal rha isiliye innu innu sa us kaam mein rehta, but mai sahi mein aapko yeh toh feel hone nahi dunga ki yaar mai in sab ki wajah se aapko time nahi de rha. Yeh baat aap mere pe chhod do ab, mai sambhalunga babiiee dollll. And rahi baat aaj jo maine samay ko bola, isse mereko yeh seekh mil gyi ki I definitely have to think, and moreover, I understand ki isse ultimately aapko value nahi karta karke bhi matlab nikal rha. Mai soche ja rha hu but mereko solution nahi dikh rha siway ki mai aage se isko prove karte jau bas. Toh mai aapse thoda sa time maangta hu taaki mai khud ko thodasa prove kar pau ki jo aap sochte ki mai aapko kam value karta hu woh sab jhut hai.`,
  `Next, mai apni galti ke baare mein baat karna chahta hu ki mai bohot zyada baar unknowingly aapko hurt kar baitha hu due to which you got to suffer so many times. Mai un sab ke badle mein jo bhi saza doge un sab ke liye puri tarah se taiyaar hu. Mai sahi bata rha hu ki mai aage se aur zyada dhyaan rakhunga. Maine pehle bhi bohot cheezo pe bola tha ki mai aage se dhyaan rakhunga and mai bohot cheezo mein shaayad pehle se toh better ho gaya hu ab toh. And I really know the kind of love my girlfriend deserves, and is baat pe puri tarah agree kar rha hu ki mai us level ka efforts nahi daal rha. Mereko us cheez ka realisation hai mera babiee. Mereko thoda sa time do, I will definitely, definitely try again and try more to get back the trust, the confidence on me and also on my love.`,
  `Babbbbb, finally mai batana chahta hu mera pyaar aapke liye bohot bohot zyaada hai and it really even matters so much. Aap mere liye bohot kuch karey ho, aap mere liye itna pray karte ho, itna kuch care care ho, and still I fail to love you the way you wanted. And haa bhai mai bhi maanta hu ki 8 mahine mein itna toh mereko samaj aana chahiye tha. See mai batata, jaha tak maine think karke thoda bohot figure out kara... see, jab bhi apan ache rehte, sab sahi chal rha hota, tab mereko aisa lagta ki haa ab toh we are good, we are happy with each other. But mai aise he kuch galat kar deta, aapko hurt ho jata. Toh mai wahi soch rha ki aage aisa kuch na karu, aapko woh pyaar du, aapko woh feel karwau ki yes he is the one, because I really feel that thing da, I really feel yes she is the onee!!`,
];

export default function Phase5() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(0);
  const [showClosing, setShowClosing] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Add a slight delay before paragraphs start appearing to allow envelope animation to finish
    const startDelay = 1000; 

    paragraphs.forEach((_, i) => {
      timers.push(setTimeout(() => setVisible(i + 1), startDelay + 500 + i * 1300));
    });

    const base = startDelay + 500 + paragraphs.length * 1300;
    timers.push(setTimeout(() => setShowClosing(true), base + 400));
    timers.push(setTimeout(() => setShowFooter(true), base + 1200));

    return () => timers.forEach(clearTimeout);
  }, [isOpen]);

  // Smooth-scroll to bottom as paragraphs appear
  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [visible, showClosing, isOpen]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center relative z-10 px-4"
      style={{
        justifyContent: isOpen ? 'flex-start' : 'center',
        paddingTop: isOpen ? '2rem' : '0'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="inbox-envelope"
            className="cursor-pointer"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0, y: -50, transition: { duration: 0.6 } }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '100%',
              maxWidth: '450px',
              height: '280px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Back of envelope */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: '#f48fb1',
                borderRadius: '16px',
                boxShadow: '0 20px 50px rgba(233,30,99,0.3)',
              }}
            />
            {/* Letter peek inside */}
            <div
              style={{
                position: 'absolute',
                top: '15px',
                left: '25px',
                right: '25px',
                bottom: '25px',
                background: '#fffdf9',
                borderRadius: '8px',
                border: '1px solid #fce4ec'
              }}
            >
                <div style={{ height: '30px', background: 'linear-gradient(135deg,#f8bbd0 0%,#fce4ec 50%,#f48fb1 100%)', borderRadius: '8px 8px 0 0' }} />
            </div>
            {/* Front folds */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: '#f06292',
                clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 50% 65%, 0 0)',
                borderRadius: '16px',
              }}
            />
            {/* Top Flap closed */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '65%',
                background: '#e91e63',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                borderRadius: '16px 16px 0 0',
              }}
            />
            {/* Wax Seal */}
            <motion.div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '70px',
                height: '70px',
                background: '#c2185b',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                border: '3px solid #ad1457',
                zIndex: 10,
              }}
              animate={{ scale: [1, 1.05, 1], boxShadow: ['0 4px 10px rgba(0,0,0,0.2)', '0 6px 15px rgba(233,30,99,0.5)', '0 4px 10px rgba(0,0,0,0.2)'] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <span style={{ fontSize: '2rem' }}>💌</span>
            </motion.div>
            
            <motion.p
              style={{
                position: 'absolute',
                bottom: '-45px',
                left: '0',
                right: '0',
                textAlign: 'center',
                color: '#d81b60',
                fontFamily: 'Inter',
                fontWeight: 700,
                fontSize: '1.2rem',
                textShadow: '0 2px 4px rgba(255,255,255,0.8)'
              }}
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Tap to open this letter ✨
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="letter-content"
            style={{ width: '100%', maxWidth: '680px', paddingBottom: '2rem' }}
            initial={{ y: 200, scale: 0.6, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 90, damping: 20, delay: 0.2 }}
          >

            {/* ── Letter header ── */}
            <motion.div
              style={{
                borderRadius: '24px 24px 0 0',
                overflow: 'hidden',
                background: 'linear-gradient(135deg,#f8bbd0 0%,#fce4ec 50%,#f48fb1 100%)',
              }}
            >
              <div
                className="text-center"
                style={{ padding: 'clamp(24px, 5vw, 44px)' }}
              >
                <motion.div
                  style={{ fontSize: '3.5rem', marginBottom: '10px' }}
                  className="select-none"
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 3.2, repeat: Infinity }}
                >
                  💌
                </motion.div>

                <h2
                  className="font-dancing text-pink-700"
                  style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)', marginBottom: '4px' }}
                >
                  A Letter for You
                </h2>

                <p className="font-inter text-pink-500" style={{ fontSize: '0.82rem', letterSpacing: '0.06em' }}>
                  from Shakkar, with all my love
                </p>

                <div className="flex justify-center gap-2 mt-4 select-none">
                  {['🌸', '💕', '🌹', '💕', '🌸'].map((e, i) => (
                    <motion.span
                      key={i}
                      style={{ fontSize: '1.2rem' }}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ delay: i * 0.18, duration: 2.1, repeat: Infinity }}
                    >
                      {e}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Wavy bottom edge */}
              <svg
                viewBox="0 0 1200 50"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: 'block', width: '100%', marginBottom: -1 }}
              >
                <path
                  d="M0,25 C200,50 400,0 600,25 C800,50 1000,0 1200,25 L1200,50 L0,50 Z"
                  fill="#fffdf9"
                />
              </svg>
            </motion.div>

            {/* ── Paper body ── */}
            <div
              className="paper-texture"
              style={{
                borderRadius: '0 0 24px 24px',
                boxShadow: '0 12px 48px rgba(233,30,99,0.10), 0 2px 12px rgba(0,0,0,0.05)',
                padding: 'clamp(28px, 6vw, 60px)',
                paddingTop: 'clamp(32px, 6vw, 56px)',
              }}
            >
              {/* Red margin line */}
              <div style={{ borderLeft: '3px solid rgba(233,30,99,0.18)', paddingLeft: 'clamp(16px, 3vw, 28px)' }}>

                {/* Paragraphs */}
                {paragraphs.map((text, i) => (
                  <AnimatePresence key={i}>
                    {i < visible && (
                      <motion.p
                        className="font-crimson text-gray-700 leading-loose"
                        style={{
                          fontSize: 'clamp(1rem, 2.6vw, 1.15rem)',
                          marginBottom: 'clamp(20px, 3vw, 32px)',
                          textAlign: 'justify',
                          hyphens: 'auto',
                        }}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.75, ease: 'easeOut' }}
                      >
                        {/* Drop cap on first para */}
                        {i === 0 ? (
                          <>
                            <span
                              className="font-playfair text-pink-600 italic"
                              style={{
                                float: 'left',
                                fontSize: 'clamp(3.2rem, 8vw, 4.4rem)',
                                lineHeight: '0.75',
                                marginRight: '8px',
                                marginTop: '6px',
                              }}
                            >
                              H
                            </span>
                            {'ey Zuzu, ' + text.slice('Hey Zuzu, '.length)}
                          </>
                        ) : (
                          text
                        )}
                      </motion.p>
                    )}
                  </AnimatePresence>
                ))}

                {/* Closing */}
                <AnimatePresence>
                  {showClosing && (
                    <motion.div
                      className="text-right"
                      style={{ marginTop: '8px' }}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <div style={{ height: 1, background: '#fce4ec', marginBottom: '20px' }} />

                      <motion.p
                        className="font-dancing text-pink-600"
                        style={{ fontSize: 'clamp(1.8rem, 6vw, 2.8rem)' }}
                        animate={{ scale: [1, 1.03, 1] }}
                        transition={{ duration: 2.4, repeat: Infinity }}
                      >
                        I love you Zuzu. 💕
                      </motion.p>

                      <p
                        className="font-playfair italic text-pink-400"
                        style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)', marginTop: '6px' }}
                      >
                        — Shakkar 🌹
                      </p>

                      <motion.div
                        className="flex justify-end gap-2 mt-4 select-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {['💕', '🌸', '💖', '🌹', '✨'].map((e, i) => (
                          <motion.span
                            key={i}
                            style={{ fontSize: '1.3rem' }}
                            animate={{ y: [0, -8, 0] }}
                            transition={{ delay: i * 0.18, duration: 2, repeat: Infinity }}
                          >
                            {e}
                          </motion.span>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={bottomRef} />
              </div>
            </div>

            {/* ── Footer card ── */}
            <AnimatePresence>
              {showFooter && (
                <motion.div
                  className="glass-card rounded-2xl text-center mt-6 mb-8"
                  style={{ padding: 'clamp(18px, 4vw, 28px)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="font-inter text-pink-500" style={{ fontSize: '0.85rem', letterSpacing: '0.04em' }}>
                    Made with every ounce of my heart, just for you 💕
                  </p>
                  <p className="font-dancing text-pink-600 mt-1" style={{ fontSize: '1.4rem' }}>
                    Forever yours, Shakkar ✨
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
