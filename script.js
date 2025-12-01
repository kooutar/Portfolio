  const terminal = document.getElementById("terminal");
        const outputSection = document.getElementById("output-section");
        const input = document.getElementById("input");
        let commandHistory = [];
        let historyIndex = -1;

        const commands = {
            help: () => {
                return `<div class="output">
                    <div class="highlight">Available Commands:</div>
                    <div style="margin-left: 20px;">
                        <div>📋 <span class="highlight">about</span>     - Learn more about me</div>
                        <div>💻 <span class="highlight">skills</span>    - View my technical skills</div>
                        <div>🚀 <span class="highlight">projects</span>  - Explore my projects</div>
                        <div>📧 <span class="highlight">contact</span>   - Get in touch</div>
                        <div>🌐 <span class="highlight">social</span>    - Social media links</div>
                        <div>📜 <span class="highlight">history</span>   - View command history</div>
                        <div>🗑️  <span class="highlight">clear</span>     - Clear terminal</div>
                        <div>💡 <span class="highlight">quote</span>     - Random dev quote</div>
                    </div>
                </div>`;
            },
            
            about: () => {
                return `<div class="output">
                    <div class="highlight">👋 About Me</div>
                    <div style="margin: 10px 0;">
                        Hello! Je suis <span class="name">Kaoutar Laajil</span>, une développeuse passionnée
                        spécialisée en <span class="success">Full-Stack Development</span> avec une expertise 
                        particulière en <span class="success">Java Backend</span>.
                    </div>
                    <div style="margin: 10px 0;">
                        💼 Je construis des applications robustes et scalables<br>
                        🎯 Focus sur la qualité du code et les bonnes pratiques<br>
                        🌱 Toujours en apprentissage de nouvelles technologies
                    </div>
                </div>`;
            },
            
            skills: () => {
                const skills = [
                    'Java', 'Spring Boot', 'JUnit', 'Mockito', 
                    'MapStruct', 'Liquibase', 'SQL', 'REST APIs',
                    'Git', 'Maven', 'PostgreSQL', 'MySQL'
                ];
                
                const skillTags = skills.map(skill => 
                    `<span class="skill-tag">${skill}</span>`
                ).join('');
                
                return `<div class="output">
                    <div class="highlight">💻 Technical Skills</div>
                    <div style="margin: 10px 0;">
                        ${skillTags}
                    </div>
                </div>`;
            },
            
            projects: () => {
                return `<div class="output">
                    <div class="highlight">🚀 Featured Projects</div>
                    <div class="project-item">
                        <strong>SmartShop</strong> - E-commerce platform<br>
                        <small>Technologies: Spring Boot, REST API, PostgreSQL</small><br>
                        <a href="https://github.com/kooutar/smartshop" target="_blank">🔗 View on GitHub</a>
                    </div>
                    <div class="project-item">
                        <strong>FIFO/CUMP</strong> - Inventory management system<br>
                        <small>Technologies: Java, Liquibase, JUnit</small><br>
                        <a href="https://github.com/kooutar/fifo-cump" target="_blank">🔗 View on GitHub</a>
                    </div>
                    <div class="project-item">
                        <strong>Eventify</strong> - Event management application<br>
                        <small>Technologies: Spring Boot, MapStruct</small><br>
                        <a href="https://github.com/kooutar/eventify" target="_blank">🔗 View on GitHub</a>
                    </div>
                    <div class="project-item">
                        <strong>Tricol Chat</strong> - Real-time chat application<br>
                        <small>Technologies: WebSockets, Spring Boot</small><br>
                        <a href="https://github.com/kooutar/tricol-chat" target="_blank">🔗 View on GitHub</a>
                    </div>
                    <div style="margin-top: 15px;">
                        <a href="https://github.com/kooutar?tab=repositories" target="_blank">📂 View all repositories →</a>
                    </div>
                </div>`;
            },
            
            contact: () => {
                return `<div class="output">
                    <div class="highlight">📧 Get In Touch</div>
                    <div style="margin: 10px 0;">
                        📬 Email: <a href="mailto:kawtarlaajil7@gmail.com">kawtarlaajil7@gmail.com</a><br>
                        💼 GitHub: <a href="https://github.com/kooutar" target="_blank">github.com/kooutar</a><br>
                        <br>
                        <span class="success">✓ Open to opportunities and collaborations!</span>
                    </div>
                </div>`;
            },
            
            social: () => {
                return `<div class="output">
                    <div class="highlight">🌐 Connect With Me</div>
                    <div style="margin: 10px 0;">
                        🐙 GitHub: <a href="https://github.com/kooutar" target="_blank">@kooutar</a><br>
                        💼 LinkedIn: <span class="name">Kaoutar Laajil</span><br>
                        📧 Email: <a href="mailto:kawtarlaajil7@gmail.com">kawtarlaajil7@gmail.com</a>
                    </div>
                </div>`;
            },
            
            history: () => {
                if (commandHistory.length === 0) {
                    return `<div class="output">No commands in history yet.</div>`;
                }
                const historyList = commandHistory
                    .map((cmd, i) => `  ${i + 1}  ${cmd}`)
                    .join('<br>');
                return `<div class="output">
                    <div class="highlight">Command History:</div>
                    <div style="margin-left: 10px; margin-top: 5px;">
                        ${historyList}
                    </div>
                </div>`;
            },
            
            quote: () => {
                const quotes = [
                    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
                    { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
                    { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
                    { text: "Clean code always looks like it was written by someone who cares.", author: "Robert C. Martin" },
                    { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" }
                ];
                const quote = quotes[Math.floor(Math.random() * quotes.length)];
                return `<div class="output">
                    <div style="font-style: italic; color: #ffd43b;">
                        "${quote.text}"
                    </div>
                    <div style="text-align: right; margin-top: 5px; color: #58a6ff;">
                        - ${quote.author}
                    </div>
                </div>`;
            },
            
            clear: () => 'CLEAR_TERMINAL'
        };

        function addLine(content, className = 'line') {
            const line = document.createElement('div');
            line.className = className;
            line.innerHTML = content;
            outputSection.appendChild(line);
            window.scrollTo(0, document.body.scrollHeight);
        }

        function executeCommand(cmd) {
            const trimmedCmd = cmd.trim().toLowerCase();
            
            addLine(`<span class="command-line">guest@portfolio:~$ ${cmd}</span>`);
            
            if (trimmedCmd === '') return;
            
            commandHistory.push(cmd);
            historyIndex = commandHistory.length;
            
            if (commands[trimmedCmd]) {
                const result = commands[trimmedCmd]();
                if (result === 'CLEAR_TERMINAL') {
                    outputSection.innerHTML = '';
                } else {
                    addLine(result);
                }
            } else {
                addLine(`<div class="output error">Command not found: '${cmd}'. Type 'help' for available commands.</div>`);
            }
        }

        input.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                const cmd = input.value;
                executeCommand(cmd);
                input.value = "";
            } else if (event.key === "ArrowUp") {
                event.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    input.value = commandHistory[historyIndex];
                }
            } else if (event.key === "ArrowDown") {
                event.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    input.value = commandHistory[historyIndex];
                } else {
                    historyIndex = commandHistory.length;
                    input.value = "";
                }
            } else if (event.key === "Tab") {
                event.preventDefault();
                const currentInput = input.value.toLowerCase();
                const matchingCommands = Object.keys(commands).filter(cmd => 
                    cmd.startsWith(currentInput)
                );
                if (matchingCommands.length === 1) {
                    input.value = matchingCommands[0];
                }
            }
        });

        // Keep focus on input
        document.addEventListener('click', () => input.focus());
        
        // Easter egg: Konami code
        let konamiCode = [];
        const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.key);
            konamiCode = konamiCode.slice(-10);
            
            if (konamiCode.join(',') === konamiSequence.join(',')) {
                addLine(`<div class="output success">
                    🎮 Easter egg unlocked! You found the Konami code!<br>
                    <span class="highlight">Achievement: True Hacker</span> 🏆
                </div>`);
                konamiCode = [];
            }
        });