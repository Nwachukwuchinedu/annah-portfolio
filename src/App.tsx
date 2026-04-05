import { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring as useFramerSpring, 
  AnimatePresence, 
  LayoutGroup
} from 'framer-motion';
import { 
  Droplet, 
  Database, 
  Activity, 
  Map, 
  ArrowUpRight,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

// Hooks & Constants
import { useTypewriter } from './hooks/useTypewriter';
import { ROLES } from './constants/roles';
import { sectionVariants, itemVariants } from './constants/variants';

// Components
import { CustomCursor } from './components/common/CustomCursor';
import { MagneticButton } from './components/common/MagneticButton';
import { RevealText } from './components/common/RevealText';
import { AnimatedCounter } from './components/common/AnimatedCounter';
import { KPIDashboardCard } from './components/common/KPIDashboardCard';
import { TiltCard } from './components/common/TiltCard';
import { SkillBar } from './components/common/SkillBar';
import { FloatingPill } from './components/common/FloatingPill';
import { ScrollSpySidebar } from './components/layout/ScrollSpySidebar';
import { SpreadsheetDemo } from './components/demos/SpreadsheetDemo';
import { ExcelChartDemo } from './components/demos/ExcelChartDemo';
import { ProjectCard } from './components/projects/ProjectCard';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { scrollY } = useScroll();
  const blobY1 = useTransform(scrollY, [0, 2000], [0, 500]);
  const blobY2 = useTransform(scrollY, [0, 2000], [0, -300]);

  const { scrollYProgress } = useScroll();
  const scaleX = useFramerSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const typewriterText = useTypewriter(ROLES);

  const timelineRef = useRef<HTMLElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({ target: timelineRef });
  const timelineX = useTransform(timelineProgress, [0, 1], ["0%", "-70%"]); 

  // Parallax Refs and Transforms
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  const aboutRef = useRef<HTMLElement>(null);
  const { scrollYProgress: aboutProgress } = useScroll({ target: aboutRef, offset: ["start end", "end start"] });
  const aboutImgY = useTransform(aboutProgress, [0, 1], ["-15%", "15%"]);

  useEffect(() => { setIsLoaded(true); }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 font-sans selection:bg-amber-200 selection:text-amber-900">
      
      <CustomCursor />
      <FloatingPill />
      <ScrollSpySidebar />
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-amber-500 origin-left z-[100]" 
        style={{ scaleX }} 
      />

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div style={{ y: blobY1 }} className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-amber-500/5 blur-[120px]" />
        <motion.div style={{ y: blobY2 }} className="absolute top-[40%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-slate-300/20 blur-[120px]" />
      </div>

      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
        className="fixed top-0 w-full z-50 py-6 px-8 md:px-16 backdrop-blur-md bg-[#FAF9F6]/80 border-b border-slate-200/50"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-serif text-2xl tracking-wide flex items-center gap-3" data-cursor="Home">
            <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white text-lg leading-none pt-1">A</div>
            Annah Ibukun
          </div>
          
          <div className="hidden md:flex items-center gap-10 font-sans text-sm tracking-wide font-medium text-slate-600">
            <motion.button onClick={() => scrollTo('about')} whileHover={{ color: '#d97706' }} data-cursor="View">About</motion.button>
            <motion.button onClick={() => scrollTo('expertise')} whileHover={{ color: '#d97706' }} data-cursor="View">Expertise</motion.button>
            <motion.button onClick={() => scrollTo('data-demos')} whileHover={{ color: '#d97706' }} data-cursor="View">Data Demos</motion.button>
            <motion.button onClick={() => scrollTo('projects')} whileHover={{ color: '#d97706' }} data-cursor="View">Projects</motion.button>
          </div>

          <button className="md:hidden text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="absolute top-full left-0 w-full bg-[#FAF9F6] border-b border-slate-200 overflow-hidden md:hidden shadow-[0_20px_40px_rgba(0,0,0,0.05)]"
            >
              <div className="flex flex-col p-8 gap-6 font-serif text-2xl text-slate-900">
                <button onClick={() => scrollTo('about')} className="text-left w-full border-b border-slate-200 pb-2">About</button>
                <button onClick={() => scrollTo('expertise')} className="text-left w-full border-b border-slate-200 pb-2">Expertise</button>
                <button onClick={() => scrollTo('data-demos')} className="text-left w-full border-b border-slate-200 pb-2">Data Demos</button>
                <button onClick={() => scrollTo('projects')} className="text-left w-full border-b border-slate-200 pb-2">Projects</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO SECTION */}
      <section id="hero" ref={heroRef} className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-16 pt-24 max-w-7xl mx-auto overflow-hidden">
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
              style={{ y: heroY, opacity: heroOpacity }}
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-slate-200 bg-white mb-8" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
                <span className="relative flex h-2 w-2">
                  <motion.span 
                    className="absolute inline-flex h-full w-full rounded-full bg-amber-400"
                    animate={{ scale: [1, 2.5], opacity: [0.75, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                  />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span className="text-xs font-sans tracking-widest uppercase font-semibold text-slate-600">Available for Opportunities</span>
              </motion.div>

              <RevealText 
                text="Pioneering the Future of Energy." 
                className="font-serif text-6xl md:text-8xl lg:text-[7rem] leading-[1.05] tracking-tight text-slate-900 max-w-5xl mb-8" 
              />

              <motion.div variants={itemVariants} className="text-xl md:text-2xl font-sans text-slate-500 mb-12 font-light flex flex-wrap gap-2 items-center">
                <span>Graduate Engineer specializing as a</span>
                <span className="font-medium text-amber-600 inline-block min-w-[200px]">
                  {typewriterText}
                  <motion.span 
                    animate={{ opacity: [1, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }} 
                    className="ml-1 text-slate-300"
                  >|</motion.span>
                </span>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6">
                <MagneticButton primary={true} onClick={() => scrollTo('about')} className="px-8 py-4 rounded-full bg-slate-900 text-white font-sans text-sm tracking-wide border border-transparent">
                  Explore My Work
                </MagneticButton>
                <MagneticButton primary={false} onClick={() => scrollTo('contact')} cursor="Mail" className="px-8 py-4 rounded-full bg-transparent border border-slate-300 text-slate-900 font-sans text-sm tracking-wide">
                  Contact Me
                </MagneticButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* STATS STRIP */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={sectionVariants}
        className="relative z-10 border-y border-slate-200/50 bg-[#FAF9F6]"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3">
          <AnimatedCounter end={4} label="Years of Study" />
          <AnimatedCounter end={12} suffix="+" label="Engineering Projects" />
          <AnimatedCounter end={100} suffix="%" label="Active SPE Member" />
        </div>
      </motion.section>

      {/* ABOUT SECTION */}
      <section id="about" ref={aboutRef} className="relative z-10 py-32 px-8 md:px-16 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm" data-cursor="Look">
            <motion.div
              initial={{ x: 0 }}
              whileInView={{ x: "100%" }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
              className="absolute inset-0 bg-amber-500 z-10 origin-left"
            />
            <motion.img 
              initial={{ scale: 1.2, filter: "grayscale(100%)" }}
              whileInView={{ scale: 1.1 }}
              whileHover={{ filter: "grayscale(0%)", scale: 1.15 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ y: aboutImgY }}
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop" 
              alt="Annah Ibukun" 
              className="w-full h-[130%] object-cover object-center -mt-[15%]"
            />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={sectionVariants}
            className="space-y-8"
          >
            <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl font-serif text-slate-900">
              Engineering with <br/><span className="text-amber-600">Purpose.</span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-lg font-sans text-slate-600 leading-relaxed">
              I am a dedicated Petroleum Engineering Graduate deeply passionate about driving efficiency and innovation in the Oil and Gas sector. My focus bridges traditional extraction principles with modern data science.
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-lg font-sans text-slate-600 leading-relaxed">
              Beyond the technical constraints of reservoir simulation and field operations, I pride myself on collaborative problem-solving. By integrating Python and data analytics into engineering workflows, I aim to architect sustainable and optimized energy solutions.
            </motion.p>

            <motion.div variants={itemVariants} className="pt-8">
              <h4 className="font-serif text-2xl text-slate-900 mb-8">Technical Proficiencies</h4>
              <SkillBar skill="Reservoir Simulation" percentage={85} />
              <SkillBar skill="Data Analytics (Python)" percentage={70} />
              <SkillBar skill="Production Optimization" percentage={90} />
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* EXPERTISE SECTION */}
      <section id="expertise" className="relative z-10 py-32 px-8 md:px-16 bg-slate-50 border-y border-slate-200/50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={sectionVariants}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-5xl font-serif text-slate-900 mb-6">Core Competencies</h2>
            <p className="text-lg font-sans text-slate-600">A rigorous foundation in petroleum sciences, amplified by computational skills and a commitment to operational excellence.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TiltCard 
              icon={<Droplet className="w-6 h-6" />}
              title="Reservoir Engineering"
              description="Volumetric analysis, material balance, and fluid flow modeling to maximize hydrocarbon recovery factors safely."
            />
            <TiltCard 
              icon={<Database className="w-6 h-6" />}
              title="Data Analytics"
              description="Leveraging Python to parse drilling logs and production data, translating raw metrics into actionable operational strategies."
            />
            <TiltCard 
              icon={<Activity className="w-6 h-6" />}
              title="Production Optimization"
              description="Analyzing nodal systems and artificial lift methods to enhance well performance and extend lifecycle profitability."
            />
            <TiltCard 
              icon={<Map className="w-6 h-6" />}
              title="Field Operations"
              description="Solid understanding of rig safety protocols, drilling mechanics, and cross-disciplinary team coordination on site."
            />
          </div>
        </motion.div>
      </section>

      {/* DATA IN ACTION: DEMO SECTION */}
      <section id="data-demos" className="relative z-10 py-32 px-8 md:px-16 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants}>
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-5xl font-serif text-slate-900 mb-4">Show, Don't Tell.</h2>
            <p className="text-lg font-sans text-slate-600 max-w-2xl">Interacting with data isn't just a skill—it's how I think. Here are live, coded simulations of standard petroleum data workflows demonstrating precision and analytical capability.</p>
          </motion.div>

          {/* KPI Dashboard */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <KPIDashboardCard title="Field Output Simulation" value={4200} suffix=" BBL/d" />
            <KPIDashboardCard title="Estimated Facility Uptime" value={94.3} suffix="%" decimals={1} />
            <KPIDashboardCard title="Target Cost Per Barrel" value={18.2} prefix="$" decimals={1} />
          </motion.div>

          {/* Interactive Demos Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            <SpreadsheetDemo />
            <ExcelChartDemo />
          </div>
        </motion.div>
      </section>

      {/* HORIZONTAL TIMELINE */}
      <section id="timeline" ref={timelineRef} className="relative h-[300vh] bg-slate-50 border-y border-slate-200/50">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-32">
          <div className="px-8 md:px-16 max-w-7xl mx-auto w-full mb-16 shrink-0">
            <h2 className="text-5xl font-serif text-slate-900">Career Trajectory</h2>
          </div>

          <div className="relative w-full flex items-center" data-cursor="Scroll">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-300 -translate-y-1/2" />
            
            <motion.div style={{ x: timelineX }} className="flex gap-12 px-8 md:px-16 relative z-10 w-max">
              {[
                { 
                  year: "Aug '21 - Sep '25", 
                  title: "Bachelor of Engineering - BE, Petroleum Engineering", 
                  desc: "University of Benin. Built a strong foundation in core petroleum principles, reservoir management, and field operations.",
                  image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
                },
                { 
                  year: "2022 - Present", 
                  title: "Society of Petroleum Engineers", 
                  desc: "Active SPE member and passionate volunteer, continuously networking with industry leaders and participating in technical symposiums.",
                  image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop"
                },
                { 
                  year: "2023 - Present", 
                  title: "Data Analytics Focus", 
                  desc: "Actively building skills in Python and Data Analytics to bring modern, data-driven decision making to traditional energy workflows.",
                  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
                },
                { 
                  year: "Nov '24 - Feb '25", 
                  title: "Student Intern @ Energia", 
                  desc: "On-site internship in Lagos State, Nigeria. Gained hands-on experience in Petroleum Engineering operations and developed strong professional communication skills.",
                  image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800&auto=format&fit=crop"
                },
                { 
                  year: "Dec '25 - Present", 
                  title: "Marketing Assistant @ Charge Circle", 
                  desc: "Part-time remote position. Broadening cross-functional expertise, managing digital initiatives, and demonstrating high adaptability in a fast-paced environment.",
                  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
                }
              ].map((item, i) => (
                <div key={i} className="w-[350px] md:w-[450px] shrink-0 bg-white p-8 md:p-10 border border-slate-200/50 relative group flex flex-col" data-cursor="Read" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
                  <div className="absolute -top-[1.4rem] left-10 bg-amber-500 text-white font-sans text-sm font-bold tracking-widest px-4 py-1.5 shadow-sm z-10">
                    {item.year}
                  </div>
                  <div className="w-3 h-3 bg-amber-500 absolute -left-[1.5rem] md:-left-[3rem] top-1/2 -translate-y-1/2 rounded-full hidden sm:block z-10" style={{ boxShadow: "0 0 0 6px rgba(217,119,6,0.1)" }} />
                  
                  <div className="w-full h-40 md:h-48 bg-slate-100 rounded-sm mb-6 overflow-hidden relative border border-slate-100/50">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
                    <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-500" />
                  </div>

                  <h3 className="text-2xl font-serif text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 font-sans leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* EXPANDABLE PROJECTS SECTION */}
      <section id="projects" className="relative z-10 py-32 px-8 md:px-16 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={sectionVariants}>
          <motion.h2 variants={itemVariants} className="text-5xl font-serif text-slate-900 mb-16">Selected Projects</motion.h2>

          <LayoutGroup>
            <motion.div variants={itemVariants} className="flex flex-col gap-6">
              <ProjectCard 
                title="Reservoir Decline Curve Analysis Automation"
                category="Data Science / Python"
                summary="Developed a Python tool utilizing pandas and matplotlib to automate the generation of decline curves from raw production data."
                details="By scripting the Arps equation analysis, the tool reduced manual calculation time by 40%, allowing for faster forecasting of remaining reserves and economic viability assessments for aging wells."
                excelMockupData={{
                  headers: ["Month", "Q_actual (bbl/d)", "Q_forecast", "Di", "b-factor"],
                  rows: [
                    ["1", "450.0", "448.2", "0.08", "0.5"],
                    ["2", "415.2", "416.5", "-", "-"],
                    ["3", "386.1", "389.0", "-", "-"],
                    ["4", "360.5", "364.8", "-", "-"],
                  ]
                }}
              />
              <ProjectCard 
                title="Reservoir Pressure Analysis"
                category="Reservoir Engineering"
                summary="Built in Excel, cross-validated in Python. Analyzed bottom-hole pressure buildup data to estimate skin factor and permeability."
                details="Constructed Horner plots in Excel to interpret transient pressure behaviors. Results confirmed a high positive skin, justifying a recommendation for matrix acidization which theoretically improved PI by 25%."
                excelMockupData={{
                  headers: ["dt (hrs)", "t+dt", "(t+dt)/dt", "Pws (psia)"],
                  rows: [
                    ["1.0", "73.0", "73.0", "3120"],
                    ["2.5", "74.5", "29.8", "3185"],
                    ["5.0", "77.0", "15.4", "3240"],
                    ["10.0", "82.0", "8.2", "3305"],
                  ]
                }}
              />
              <ProjectCard 
                title="Waterflood Sweep Efficiency Study"
                category="Reservoir Engineering"
                summary="Analyzed injection well placement patterns (5-spot vs 9-spot) to determine optimal areal sweep efficiency."
                details="Utilized academic simulation models to track waterfront advancement. Concluded that specific staggered line drives offered superior recovery profiles for the simulated permeability field, documented in my final year thesis."
              />
            </motion.div>
          </LayoutGroup>
        </motion.div>
      </section>

      {/* FOOTER & LARGE CONTACT */}
      <footer id="contact" className="relative z-10 bg-slate-900 text-white pt-32 pb-12 px-8 md:px-16 mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={sectionVariants} className="mb-24">
            <motion.h2 variants={itemVariants} className="text-5xl md:text-8xl font-serif leading-tight mb-8">
              Let's engineer the <br/><span className="text-amber-500 italic">next solution.</span>
            </motion.h2>
            <motion.div variants={itemVariants}>
              <MagneticButton 
                primary={false}
                className="group flex items-center gap-4 text-xl font-sans tracking-wide border-b border-amber-500 pb-2 bg-transparent text-white"
                cursor="Mail"
                onClick={() => window.location.href = 'mailto:hello@example.com'}
              >
                Contact Annah Ibukun
                <ArrowUpRight className="w-6 h-6" />
              </MagneticButton>
            </motion.div>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-slate-800 text-slate-400 font-sans text-sm">
            <p>© {new Date().getFullYear()} Annah Ibukun. All rights reserved.</p>
            <div className="flex gap-8">
              <motion.a href="https://www.linkedin.com/in/annahibukun/" target="_blank" rel="noopener noreferrer" whileHover={{ color: "#d97706" }} data-cursor="Link">LinkedIn</motion.a>
              <motion.a href="#" whileHover={{ color: "#d97706" }} data-cursor="Link">SPE Profile</motion.a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
