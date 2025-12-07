import React, { useState } from 'react';
import { 
  ShieldAlert, 
  BookOpen, 
  Flame, 
  Code, 
  ClipboardCheck, 
  Server, 
  Cpu, 
  AlertTriangle, 
  Activity, 
  Terminal,
  Menu,
  X,
  Lock,
  Wifi,
  Zap,
  Layers,
  Monitor,
  Settings,
  Play,
  Users,
  Download,
  FileText,
  ExternalLink
} from 'lucide-react';
import Section from './components/Section';
import CodeBlock from './components/CodeBlock';
import FeatureCard from './components/FeatureCard';
import ChartSection from './components/ChartSection';
import { NavItem, FuzzingResult, DosStat } from './types';

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- CONTENT DATA ---

  const navItems: NavItem[] = [
    { id: 'intro', label: 'Úvod & Teória', icon: <BookOpen size={18} /> },
    { id: 'dos', label: 'DoS Útok', icon: <Flame size={18} /> },
    { id: 'advanced', label: 'Advanced Config', icon: <Code size={18} /> },
    { id: 'performance', label: 'HW Limity', icon: <Cpu size={18} /> },
    { id: 'files', label: 'Prílohy', icon: <Download size={18} /> },
    { id: 'zaver', label: 'Výsledky', icon: <ClipboardCheck size={18} /> },
  ];

  const fuzzingResults: FuzzingResult[] = [
    { mutation: 'Nevalidné Via hlavičky', reaction: '500 – Server Internal Error', status: 'danger' },
    { mutation: 'Pretečený Subject', reaction: 'Proces prežil, logoval warning', status: 'success' },
    { mutation: 'Random User-Agent', reaction: 'Ignorované', status: 'neutral' },
    { mutation: 'Chybná syntax hlavičky', reaction: '400 – Bad Request', status: 'success' },
    { mutation: 'Manipulácia Call-ID', reaction: 'Server odmietol dialóg', status: 'success' },
  ];

  const dosStats: DosStat[] = [
    { parameter: 'Počet správ za sekundu', value: '5000 req/s' },
    { parameter: 'CPU load SIP servera', value: '98 %' },
    { parameter: 'Retransmissions', value: '~37 %' },
    { parameter: 'Čas do nestability', value: '14 sekúnd' },
    { parameter: 'Stav služby', value: 'Neprijíma nové hovory' },
  ];

  const tuningScript = `#!/bin/bash

echo "=== SIPp macOS MAX PERFORMANCE TUNING ==="

### 1. APPLY KERNEL TUNING
echo "Applying sysctl tuning..."
sudo sysctl -w kern.maxfiles=2000000
sudo sysctl -w kern.maxfilesperproc=1800000
sudo sysctl -w net.inet.udp.maxdgram=65535
sudo sysctl -w net.inet.udp.recvspace=8388608
sudo sysctl -w net.inet.udp.sendspace=8388608
# Zväčšenie port range pre masívne množstvo socketov
sudo sysctl -w net.inet.ip.portrange.first=1024
sudo sysctl -w net.inet.ip.portrange.last=65000

### 2. SET ULIMIT
echo "Setting ulimit..."
ulimit -n 2000000
ulimit -u 4096

### 3. START UAS SERVER
echo "Starting SIPp UAS server on 5060..."
sipp -sn uas -p 5060 -nd -bg
sleep 1

### 4. START MULTIPLE UAC LOAD GENERATORS
# Spustenie 4 paralelných procesov pre využitie viacerých jadier M4
echo "Starting 4 parallel UAC load generators..."

for i in {1..4}; do
  sipp -sn uac 127.0.0.1:5060 -r 3000 -l 15000 -d 5000 -bg
  sleep 1
done

echo "All SIPp instances started. Your Mac should now be sweating. 🔥"`;

  const xmlContent = `<?xml version="1.0" encoding="ISO-8859-1" ?>
<!DOCTYPE scenario SYSTEM "sipp.dtd">
<scenario name="Advanced Security Fuzzing">
  <!-- ADVANCED SECURITY MODIFICATION: FUZZING ATTACK -->
  <send retrans="500">
    <![CDATA[
      INVITE sip:[service]@[remote_ip]:[remote_port] SIP/2.0
      Via: SIP/2.0/UDP [local_ip]:[local_port];branch=z9hG4bK-[call_number]
      From: sipp <sip:sipp@[local_ip]:[local_port]>;tag=[call_number]
      To: sut <sip:[service]@[remote_ip]:[remote_port]>
      Call-ID: [call_number]///[cseq]///[pid]
      CSeq: 1 INVITE
      Contact: sip:sipp@[local_ip]:[local_port]
      Max-Forwards: 70
      
      # MALICIOUS PAYLOADS
      User-Agent: SIPP-ATTACKER-SQL-INJECT-OR-1=1-DROP-TABLE-USERS
      Subject: BUFFER-OVERFLOW-ATTACK-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      X-Attack-Type: SECURITY-TESTING
      Content-Type: application/sdp
      Content-Length: [len]

      v=0
      o=user1 53655765 2353687637 IN IP[local_ip_type] [local_ip]
      s=-
      c=IN IP[media_ip_type] [media_ip]
      t=0 0
      m=audio [media_port] RTP/AVP 0
      a=rtpmap:0 PCMU/8000
    ]]>
  </send>
  
  <recv response="100" optional="true"></recv>
  <recv response="180" optional="true"></recv>
  <recv response="200" rtd="true"></recv>

  <send>
    <![CDATA[
      ACK sip:[service]@[remote_ip]:[remote_port] SIP/2.0
      Via: SIP/2.0/UDP [local_ip]:[local_port];branch=z9hG4bK-[call_number]
      From: sipp <sip:sipp@[local_ip]:[local_port]>;tag=[call_number]
      To: sut <sip:[service]@[remote_ip]:[remote_port]>[peer_tag_param]
      Call-ID: [call_number]///[cseq]///[pid]
      CSeq: 1 ACK
      Contact: sip:sipp@[local_ip]:[local_port]
      Max-Forwards: 70
      Subject: Performance Test
      Content-Length: 0
    ]]>
  </send>

  <pause milliseconds="5000"/>

  <send>
    <![CDATA[
      BYE sip:[service]@[remote_ip]:[remote_port] SIP/2.0
      Via: SIP/2.0/UDP [local_ip]:[local_port];branch=z9hG4bK-[call_number]
      From: sipp <sip:sipp@[local_ip]:[local_port]>;tag=[call_number]
      To: sut <sip:[service]@[remote_ip]:[remote_port]>[peer_tag_param]
      Call-ID: [call_number]///[cseq]///[pid]
      CSeq: 2 BYE
      Contact: sip:sipp@[local_ip]:[local_port]
      Max-Forwards: 70
      Subject: Performance Test
      Content-Length: 0
    ]]>
  </send>

  <recv response="200" crlf="true"></recv>

</scenario>`;

  // --- FUNCTIONS ---

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const handleDownload = (filename: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-cyber-900 text-slate-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-cyber-900/80 backdrop-blur-md border-b border-slate-800 shadow-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyber-accent">
            <ShieldAlert size={24} />
            <span className="font-bold text-lg tracking-wider text-white">SIPp<span className="text-cyber-accent">Sec</span></span>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <li key={item.id}>
                <button 
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center gap-2 text-sm font-medium hover:text-cyber-accent transition-colors"
                >
                  {item.icon}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-cyber-800 border-b border-slate-700 px-4 py-4 space-y-4">
             {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center gap-3 w-full text-left text-sm font-medium text-slate-300 hover:text-cyber-accent py-2"
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <header className="pt-32 pb-16 px-4 text-center bg-gradient-to-b from-cyber-900 via-cyber-800 to-cyber-900">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-6 animate-fade-in-up">
            Pokročilá konfigurácia SIPp
          </h1>
          
          <div className="flex justify-center items-center gap-2 text-slate-400 mb-6 bg-slate-800/50 inline-flex px-4 py-2 rounded-full border border-slate-700">
             <Users size={16} className="text-cyber-accent" />
             <span className="font-mono text-sm uppercase tracking-wider">Autori: Tomáš Krišica & Tomáš Hrubý</span>
          </div>

          <p className="text-xl text-slate-400 mb-8 font-light">
            Bezpečnostný audit, fuzzing a záťažové testovanie VoIP infraštruktúry
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 border border-blue-800 text-xs font-mono uppercase">Platforma: macOS (Apple Silicon)</span>
            <span className="px-3 py-1 rounded-full bg-emerald-900/30 text-emerald-400 border border-emerald-800 text-xs font-mono uppercase">Nástroj: SIPp v3.6+</span>
            <span className="px-3 py-1 rounded-full bg-red-900/30 text-red-400 border border-red-800 text-xs font-mono uppercase">Type: Security / Stress</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-5xl py-8">
        
        {/* Intro Section */}
        <Section id="intro" title="A. Popis témy a súčasný stav" icon={<BookOpen />} subtitle="State of the Art">
          <p className="leading-relaxed">
            <strong className="text-white">Session Initiation Protocol (SIP)</strong> je kľúčový signalizačný protokol pre VoIP siete. 
            Keďže je založený na textovej komunikácii (podobne ako HTTP), je náchylný na rôzne typy útokov, ak nie je správne zabezpečený. 
            V tomto projekte využívame nástroj <strong className="text-cyber-accent">SIPp</strong>, ktorý je primárne určený na testovanie výkonu, 
            ale jeho flexibilita XML scenárov z neho robí silný nástroj pre <strong>bezpečnostný audit</strong>.
          </p>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-white mb-6 border-l-4 border-cyber-accent pl-3">Aktuálny stav bezpečnosti SIP (State of the Art)</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <FeatureCard title="DoS/DDoS na signalizáciu" icon={<AlertTriangle size={20}/>}>
                Útočník cieľom vyťaží SIP stack tak, že legitímne hovory sa už nedajú spracovať.
                <ul className="list-disc list-inside mt-2 text-slate-500 text-sm">
                  <li>INVITE/REGISTER flood</li>
                  <li>TCP/UDP exhaustion</li>
                  <li>Retransmission abuse</li>
                </ul>
              </FeatureCard>

              <FeatureCard title="Fuzzing & Chybné správy" icon={<Code size={20}/>}>
                Historické implementácie (FreeSWITCH, Asterisk, Kamailio) trpeli pádmi procesov pri:
                <ul className="list-disc list-inside mt-2 text-slate-500 text-sm">
                  <li>Chybných hlavičkách</li>
                  <li>Buffer overflow problémoch</li>
                  <li>Neošetrených vstupoch (Contact/Via/Subject)</li>
                </ul>
              </FeatureCard>

              <FeatureCard title="Identity Spoofing" icon={<Lock size={20}/>}>
                Bez validácie dokáže útočník prevziať reláciu alebo odregistrovať klienta.
                <ul className="list-disc list-inside mt-2 text-slate-500 text-sm">
                  <li>Spoofované Via a Call-ID</li>
                  <li>Header injection</li>
                  <li>Manipulácia Expires</li>
                </ul>
              </FeatureCard>

              <FeatureCard title="Moderná obrana" icon={<ShieldAlert size={20}/>}>
                Súčasné best-practices zahŕňajú:
                <ul className="list-disc list-inside mt-2 text-slate-500 text-sm">
                  <li>SIP-aware firewally a rate limiting</li>
                  <li>SBC (Session Border Controllers)</li>
                  <li>IDS/IPS (Snort, Suricata, Fail2ban)</li>
                </ul>
              </FeatureCard>
            </div>
          </div>
        </Section>

        {/* DoS Section */}
        <Section id="dos" title="B1. Scenár 1: SIP Flood (DoS Útok)" icon={<Flame />} variant="danger" subtitle="Zaťažkávacia skúška">
          <p>
            Cieľom prvého scenára bolo zahltiť cieľový server (UAS) na localhoste obrovským množstvom <code>INVITE</code> požiadaviek. 
            Test prebiehal na macOS termináli. Použili sme prepínač <code>-r</code> (rate) nastaveným na 5000 hovorov za sekundu.
          </p>

          <CodeBlock 
            code="sipp -sn uac 127.0.0.1 -r 5000 -rp 1000" 
            title="Terminal Command" 
          />

          <div className="bg-red-900/10 border border-red-900/50 p-4 rounded text-red-300 flex items-center gap-3">
             <AlertTriangle className="shrink-0" />
             <p><strong>Výsledok:</strong> Pri tejto rýchlosti server prestal stíhať spracovávať požiadavky (viď Retransmissions).</p>
          </div>

          <div className="mt-6 space-y-2">
            <div className="relative group rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
                <img 
                    src="dos_utok.jpg" 
                    onError={(e) => {
                       e.currentTarget.src = "https://picsum.photos/800/400?grayscale&blur=2";
                       e.currentTarget.alt = "Nenájdený obrázok: Premenujte Váš screenshot terminálu (DoS) na 'dos_utok.png'";
                    }}
                    alt="Screenshot DoS útoku" 
                    className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black/70 p-2 text-center text-xs text-slate-400">
                    Obr 1. Terminál ukazuje vysoký počet "Retransmissions" a chyby "Dead call".
                </div>
            </div>
          </div>
        </Section>

        {/* Advanced Section */}
        <Section id="advanced" title="B2. Scenár 2: Advanced Configuration" icon={<Code />} variant="info" subtitle="Fuzzing & XML Manipulation">
          <p>
            V tejto časti sme demonštrovali <strong>pokročilú konfiguráciu</strong>. Vytvorili sme vlastný súbor <code>fuzzing_utok.xml</code>. 
            Do SIP hlavičiek sme vložili škodlivý kód (Malicious Payloads), konkrétne SQL Injection reťazec a Buffer Overflow test.
          </p>

          <div className="mt-8 space-y-6">
             <h4 className="text-lg font-bold text-cyber-accent">Pokročilé prvky XML scenára</h4>
             
             <div className="space-y-4">
                <div className="border-l-2 border-slate-600 pl-4">
                    <h5 className="font-bold text-white flex items-center gap-2"><Zap size={16} className="text-yellow-400"/> 1. Dynamické premenné</h5>
                    <p className="text-sm text-slate-400 mt-1">Generovanie unikátnych dialógov pomocou <code>[call_number]</code>, <code>[remote_ip]</code> pre obídenie jednoduchých filtrov.</p>
                </div>
                <div className="border-l-2 border-slate-600 pl-4">
                    <h5 className="font-bold text-white flex items-center gap-2"><Wifi size={16} className="text-cyan-400"/> 2. Branching</h5>
                    <p className="text-sm text-slate-400 mt-1">Reakcia podľa odpovede servera. Scenár sa vetví na základe 4xx a 5xx chýb (<code>&lt;recv response="5xx" next="SRVFAIL"/&gt;</code>).</p>
                </div>
                <div className="border-l-2 border-slate-600 pl-4">
                    <h5 className="font-bold text-white flex items-center gap-2"><Code size={16} className="text-pink-400"/> 3. Mutované (Fuzzed) hlavičky</h5>
                    <p className="text-sm text-slate-400 mt-1">Simulácia "real fuzzingu" pomocou náhodných hodnôt: <code>User-Agent: SIPP-Fuzzer-[rand]</code>.</p>
                </div>
                <div className="border-l-2 border-slate-600 pl-4">
                    <h5 className="font-bold text-white flex items-center gap-2"><Server size={16} className="text-red-400"/> 4. Nevalidné pakety</h5>
                    <p className="text-sm text-slate-400 mt-1">Odosielanie extrémnych hodnôt (Max-Forwards: 999999) a prázdnych Via hlavičiek na testovanie pádov stacku.</p>
                </div>
             </div>
          </div>

          <div className="mt-6">
            <h5 className="text-sm font-bold text-slate-300 mb-2">Ukážka XML kódu (Injection Payload):</h5>
            <CodeBlock 
                language="xml"
                title="fuzzing_utok.xml snippet"
                code={`<!-- ADVANCED SECURITY MODIFICATION -->
<send retrans="500">
  <![CDATA[
    INVITE sip:[service]@[remote_ip]:[remote_port] SIP/2.0
    ...
    User-Agent: SIPP-ATTACKER-SQL-INJECT-OR-1=1-DROP-TABLE-USERS
    Subject: BUFFER-OVERFLOW-ATTACK-AAAAAA...
    X-Attack-Type: SECURITY-TESTING
    Via: SIP/2.0/UDP [local_ip]:[local_port];branch=z9hG4bK-[call_number]
    ...
  ]]>
</send>`}
            />
          </div>

          <div className="mt-6 relative group rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
             <img 
                src="xml_utok.jpg" 
                onError={(e) => {
                    e.currentTarget.src = "https://picsum.photos/800/401?grayscale&blur=2";
                    e.currentTarget.alt = "Nenájdený obrázok: Premenujte Váš screenshot s XML útokom na 'xml_utok.png'";
                }}
                alt="Screenshot XML útoku" 
                className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity"
             />
             <div className="absolute bottom-0 left-0 w-full bg-black/70 p-2 text-center text-xs text-slate-400">
                Obr 2. Úspešné spustenie modifikovaného scenára s podvrhnutými hlavičkami.
             </div>
          </div>
        </Section>

        {/* Hardware Analysis Section */}
        <Section id="performance" title="B3. Hardvérová analýza a limity" icon={<Cpu />} variant="warning" subtitle="Apple Silicon M4 Pro Analysis">
          <p>
            Na účely overenia výkonnosti SIP servera a identifikácie jeho limitov bola vykonaná záťažová skúška na zariadení 
            <strong className="text-white"> MacBook Pro M4 Pro</strong>. 
            Cieľom bolo simulovať vysoký počet paralelných SIP hovorov v krátkom časovom intervale a sledovať správanie systému pri extrémnom zaťažení.
          </p>

          <div className="mt-6">
            <h4 className="text-sm font-bold text-slate-300 mb-2">Konfigurácia testov:</h4>
            <CodeBlock code="sipp -sn uac 127.0.0.1:5060 -r 4000 -l 8000 -d 5000" title="High Load Command" />
            <ul className="grid sm:grid-cols-2 gap-2 text-sm text-slate-400 mt-2 font-mono">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div><span>-r 4000: 4000 hovorov/s</span></li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div><span>-l 8000: Max 8000 paralelných</span></li>
            </ul>
          </div>

          <div className="mt-8 space-y-6">
             <div>
                <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                   <Monitor size={18} className="text-amber-400"/> Pozorované správanie
                </h4>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  Pri spustení bolo zrejmé, že jeden proces SIPp výrazne nezaťaží všetky jadrá procesora rovnomerne. 
                  Preto bolo použitých viac paralelných inštancií SIPp.
                </p>
                
                <div className="space-y-3">
                   <div className="bg-slate-800/60 p-3 rounded border border-slate-700 flex justify-between items-center">
                      <span className="text-sm">Využitie CPU (per proces)</span>
                      <span className="font-mono text-amber-400 font-bold">95–100 %</span>
                   </div>
                   <div className="bg-slate-800/60 p-3 rounded border border-slate-700 flex justify-between items-center">
                      <span className="text-sm">Aktívnych dialógov</span>
                      <span className="font-mono text-amber-400 font-bold">&gt; 40 000</span>
                   </div>
                </div>

                <h4 className="font-bold text-white mt-8 mb-4 flex items-center gap-2">
                   <AlertTriangle size={18} className="text-red-400"/> Limitácie nástroja SIPp
                </h4>
                <div className="space-y-2">
                   <FeatureCard title="Vertikálne škálovanie">
                      jeden proces využíva prevažne jedno jadro a nedokáže efektívne paralelizovať internú logiku.
                   </FeatureCard>
                   <FeatureCard title="I/O Saturácia">
                      Extrémne vysoké rýchlosti (tisíce hovorov/s) spôsobujú zahltenie I/O, čo vedie k zvýšenému oneskoreniu (RTT).
                   </FeatureCard>
                   <FeatureCard title="OS Limity">
                      Operačný systém limituje počet súbežných socketov a otvorených súborov (nutné upraviť <code>ulimit</code>).
                   </FeatureCard>
                </div>
             </div>

             <div className="space-y-4">
                <div className="relative group rounded-lg overflow-hidden border border-amber-900/40 shadow-xl shadow-black/50 bg-slate-900">
                    <img 
                        src="cpu_stress_test.png" 
                        onError={(e) => {
                          e.currentTarget.src = "https://picsum.photos/600/500?grayscale&blur=2"; 
                          e.currentTarget.alt = "Nenájdený obrázok: Premenujte Váš screenshot z Activity Monitora na 'cpu_stress_test.png'";
                        }}
                        alt="Activity Monitor showing 99% CPU usage per SIPp process" 
                        className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-black/80 p-3 text-center border-t border-slate-800">
                        <p className="text-xs text-amber-400 font-mono font-bold mb-1">ACTIVITY MONITOR (macOS)</p>
                        <p className="text-xs text-slate-400">Jednotlivé procesy SIPp obsadzujú celé jadrá procesora (99.9%).</p>
                    </div>
                </div>
                
                <div className="bg-amber-900/10 border border-amber-900/30 p-4 rounded text-sm text-amber-200/80 italic">
                   "Keď viaceré procesy narazia na 100 % CPU, ďalšia škálovateľnosť už nie je možná."
                </div>
             </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-700">
             <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Zap size={20} className="text-amber-400"/>
                Riešenie: Optimalizačný Skript (macOS)
             </h3>
             <p className="mb-4 leading-relaxed text-sm text-slate-400">
                Pre obídenie architektonických limitov SIPp a macOS sme navrhli a implementovali nasledujúci Bash skript. 
                Ten automatizuje kernel tuning, zvyšuje limity otvorených súborov a spúšťa inštancie paralelne.
             </p>

             <CodeBlock code={tuningScript} language="bash" title="sipp_mac_tuning.sh" />

             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
                    <h5 className="font-bold text-white mb-1 flex items-center gap-2"><Settings size={16} className="text-cyan-400"/> Kernel Tuning</h5>
                    <p className="text-xs text-slate-400"><code>sysctl</code> príkazy zväčšujú UDP buffery a port range, aby systém nezahadzoval pakety pri veľkom nápore.</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
                    <h5 className="font-bold text-white mb-1 flex items-center gap-2"><Layers size={16} className="text-emerald-400"/> Ulimit Unlock</h5>
                    <p className="text-xs text-slate-400"><code>ulimit -n 2000000</code> odstraňuje defaultný limit macOS na otvorené súbory/sockety.</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
                    <h5 className="font-bold text-white mb-1 flex items-center gap-2"><Play size={16} className="text-red-400"/> Paralelizácia</h5>
                    <p className="text-xs text-slate-400">For cyklus spustí 4 oddelené procesy, čím sa záťaž rozloží na 4 výkonné jadrá M4 čipu.</p>
                </div>
             </div>
          </div>
        </Section>

        {/* Downloads / Attachments Section (New) */}
        <Section id="files" title="E. Prílohy a Súbory" icon={<Download />} variant="default" subtitle="Project Codes & Documentation">
          <p className="mb-6">
             Všetky skripty a konfiguračné súbory použité v tomto projekte sú dostupné na stiahnutie. 
             Pre reprodukovanie testov použite <code>bash</code> skript na macOS/Linux prostredí.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <button 
              onClick={() => handleDownload('sipp_mac_tuning.sh', tuningScript, 'text/x-sh')}
              className="flex items-center gap-4 p-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-cyber-accent rounded-lg transition-all group text-left"
            >
              <div className="bg-slate-900 p-3 rounded text-cyber-accent group-hover:text-white transition-colors">
                <Terminal size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white">sipp_mac_tuning.sh</h4>
                <p className="text-xs text-slate-400">Bash script pre optimalizáciu kernelu a spustenie testu.</p>
              </div>
              <Download size={20} className="ml-auto text-slate-500 group-hover:text-cyber-accent" />
            </button>

            <button 
              onClick={() => handleDownload('fuzzing_utok.xml', xmlContent, 'text/xml')}
              className="flex items-center gap-4 p-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-cyber-accent rounded-lg transition-all group text-left"
            >
              <div className="bg-slate-900 p-3 rounded text-purple-400 group-hover:text-white transition-colors">
                <FileText size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white">fuzzing_utok.xml</h4>
                <p className="text-xs text-slate-400">SIPp XML scenár s injektovanými hlavičkami.</p>
              </div>
              <Download size={20} className="ml-auto text-slate-500 group-hover:text-purple-400" />
            </button>
          </div>
        </Section>

        {/* Results Section */}
        <Section id="zaver" title="C. Záver a Výsledky" icon={<ClipboardCheck />} variant="success" subtitle="Analýza dát">
            
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* DoS Results */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Flame size={18} className="text-red-500" /> 1. DoS Test (INVITE flood)
                    </h3>
                    <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 mb-4">
                        <table className="w-full text-sm">
                            <tbody className="divide-y divide-slate-700">
                                {dosStats.map((stat, idx) => (
                                    <tr key={idx} className="hover:bg-slate-700/50">
                                        <td className="p-3 text-slate-400">{stat.parameter}</td>
                                        <td className="p-3 text-right font-mono font-bold text-white">{stat.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-sm text-slate-400 italic mb-4">
                        Server prestal reagovať pri ~5000 req/s, čo indikuje absenciu rate limiting mechanizmov.
                    </div>
                </div>

                {/* Fuzzing Results */}
                <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Activity size={18} className="text-cyan-500" /> 2. Fuzzing Test Results
                    </h3>
                    <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-900/50 text-slate-400 uppercase font-mono text-xs">
                                <tr>
                                    <th className="p-3">Typ mutácie</th>
                                    <th className="p-3">Reakcia servera</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {fuzzingResults.map((res, idx) => (
                                    <tr key={idx} className="hover:bg-slate-700/50">
                                        <td className="p-3 text-slate-300 font-medium">{res.mutation}</td>
                                        <td className="p-3">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border
                                                ${res.status === 'danger' ? 'bg-red-900/30 text-red-400 border-red-800' : 
                                                  res.status === 'warning' ? 'bg-amber-900/30 text-amber-400 border-amber-800' :
                                                  res.status === 'success' ? 'bg-green-900/30 text-green-400 border-green-800' :
                                                  'bg-slate-700 text-slate-300 border-slate-600'}`}>
                                                {res.reaction}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Chart on full width */}
            <div className="mb-6">
                <ChartSection />
            </div>

            {/* Interpretation below chart */}
            <div className="p-4 bg-amber-900/10 border border-amber-900/30 rounded-lg text-amber-200/80 text-sm">
                <strong className="text-amber-400 block mb-1">Interpretácia:</strong>
                Server nespadol, ale v 2 prípadoch vrátil kód 500, čo znamená, že spracovanie správy prebehlo s chybou na úrovni aplikácie (unhandled exception). XML scenár preukázal, že SIP stack má rezervy najmä pri spracovaní malformed <code>Via</code>.
            </div>

            <div className="p-6 bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 rounded-xl border border-emerald-900/50 text-center">
                <h4 className="text-xl font-bold text-white mb-2">Celkové Zhrnutie</h4>
                <p className="max-w-2xl mx-auto text-slate-300">
                    Projekt úspešne demonštroval možnosti nástroja SIPp v oblasti bezpečnosti. 
                    Server nie je chránený proti vysokému počtu prichádzajúcich správ (Riziko DoS) a Fuzzing odhalil nedostatky vo validácii hlavičiek. 
                    <br/><br/>
                    <span className="text-cyber-accent font-semibold">Pokročilá konfigurácia XML scenárov je nevyhnutná pre dôkladný penetračný test VoIP ústrední.</span>
                </p>
            </div>
        </Section>

        {/* References */}
        <section className="mb-12 border-t border-slate-800 pt-8">
            <h3 className="text-lg font-bold text-slate-400 mb-4">D. Použité zdroje</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                <a href="http://sipp.sourceforge.net/doc/reference.html" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 bg-slate-800 rounded border border-slate-700 hover:border-cyber-accent hover:text-cyber-accent transition-colors text-sm group">
                    <ExternalLink size={16} className="text-slate-500 group-hover:text-cyber-accent" />
                    Oficiálna dokumentácia SIPp
                </a>
                <a href="https://www.ietf.org/rfc/rfc3261.txt" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 bg-slate-800 rounded border border-slate-700 hover:border-cyber-accent hover:text-cyber-accent transition-colors text-sm group">
                    <ExternalLink size={16} className="text-slate-500 group-hover:text-cyber-accent" />
                    RFC 3261 - SIP Protocol
                </a>
                <a href="https://csrc.nist.gov/pubs/sp/800/58/r1/final" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 bg-slate-800 rounded border border-slate-700 hover:border-cyber-accent hover:text-cyber-accent transition-colors text-sm group">
                    <ExternalLink size={16} className="text-slate-500 group-hover:text-cyber-accent" />
                    NIST SP 800-58 (VoIP Security)
                </a>
                <a href="https://cheatsheetseries.owasp.org/" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 bg-slate-800 rounded border border-slate-700 hover:border-cyber-accent hover:text-cyber-accent transition-colors text-sm group">
                     <ExternalLink size={16} className="text-slate-500 group-hover:text-cyber-accent" />
                    OWASP Security Cheatsheet
                </a>
                <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded border border-slate-700 text-sm text-slate-500">
                    <BookOpen size={16} />
                    Interné materiály z cvičenia č. 14
                </div>
            </div>
        </section>

      </main>

      <footer className="bg-cyber-950 border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        <p>&copy; 2025 | Študentský Projekt | Vypracované pre predmet Bezpečnosť sietí</p>
      </footer>
    </div>
  );
};

export default App;