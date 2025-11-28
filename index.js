<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>DEVIL MULTI-USER MESSAGING SYSTEM</title>
<style>
  * {
    box-sizing: border-box;
    font-family: Inter, system-ui, Arial, sans-serif;
  }
  html, body {
    height: 100%;
    margin: 0;
    background: #000;
    color: #cfcfcf;
  }
  
  body {
    background: linear-gradient(135deg, #1a0033 0%, #330033 50%, #660066 100%);
    overflow-y: auto;
    position: relative;
  }
  
  .rain-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    opacity: 0.3;
  }
  
  .raindrop {
    position: absolute;
    width: 2px;
    height: 15px;
    background: linear-gradient(transparent, #ff66cc, transparent);
    animation: fall linear infinite;
  }
  
  @keyframes fall {
    to {
      transform: translateY(100vh);
    }
  }
  
  header {
    padding: 18px 22px;
    display: flex;
    align-items: center;
    gap: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: linear-gradient(90deg, rgba(102, 0, 153, 0.6), rgba(153, 0, 102, 0.3));
    backdrop-filter: blur(4px);
  }
  
  header h1 {
    margin: 0;
    font-size: 18px;
    color: #ff66cc;
    text-shadow: 0 0 8px rgba(255, 102, 204, 0.6);
  }
  
  header .sub {
    font-size: 12px;
    color: #cc99cc;
    margin-left: auto;
  }

  .container {
    max-width: 1200px;
    margin: 20px auto;
    padding: 20px;
  }
  
  .panel {
    background: rgba(40, 0, 60, 0.7);
    border: 1px solid rgba(255, 102, 204, 0.2);
    padding: 16px;
    border-radius: 10px;
    margin-bottom: 16px;
    box-shadow: 0 8px 30px rgba(102, 0, 153, 0.5);
  }

  label {
    font-size: 13px;
    color: #ff99cc;
  }
  
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  
  .full {
    grid-column: 1 / 3;
  }
  
  input[type="text"], input[type="number"], textarea, select, .fake-file {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid rgba(255, 102, 204, 0.3);
    background: rgba(60, 0, 80, 0.6);
    color: #ffccff;
    outline: none;
    transition: all 0.3s ease;
    font-size: 14px;
  }
  
  input:focus, textarea:focus {
    box-shadow: 0 0 15px rgba(255, 102, 204, 0.8);
    border-color: #ff66cc;
    transform: scale(1.02);
  }

  .fake-file {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
  
  input[type=file] {
    display: block;
  }
  
  .controls {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 12px;
  }

  button {
    padding: 10px 14px;
    border-radius: 8px;
    border: 0;
    cursor: pointer;
    background: linear-gradient(45deg, #ff66cc, #cc00cc);
    color: white;
    font-weight: 600;
    box-shadow: 0 6px 18px rgba(255, 102, 204, 0.4);
    transition: all 0.3s ease;
  }
  
  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 102, 204, 0.6);
  }
  
  button:disabled {
    opacity: .5;
    cursor: not-allowed;
    transform: none;
  }

  .log {
    height: 300px;
    overflow: auto;
    background: #1a0033;
    border-radius: 8px;
    padding: 12px;
    font-family: monospace;
    color: #ff66cc;
    border: 1px solid rgba(255, 102, 204, 0.2);
    font-size: 12px;
  }
  
  .task-id-box {
    background: linear-gradient(45deg, #660066, #990066);
    padding: 15px;
    border-radius: 10px;
    margin: 10px 0;
    border: 2px solid #ff66cc;
    text-align: center;
    animation: glow 2s infinite alternate;
  }
  
  @keyframes glow {
    from {
      box-shadow: 0 0 10px #ff66cc;
    }
    to {
      box-shadow: 0 0 20px #ff00ff, 0 0 30px #ff66cc;
    }
  }
  
  .task-id {
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
    word-break: break-all;
  }
  
  .stats {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
    margin: 10px 0;
  }
  
  .stat-box {
    background: rgba(80, 0, 120, 0.6);
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    border: 1px solid rgba(255, 102, 204, 0.3);
  }
  
  .stat-value {
    font-size: 20px;
    font-weight: bold;
    color: #ff66cc;
  }
  
  .stat-label {
    font-size: 12px;
    color: #cc99cc;
  }
  
  .message-item {
    border-left: 3px solid #ff66cc;
    padding-left: 10px;
    margin: 5px 0;
    background: rgba(60, 0, 80, 0.3);
    padding: 8px;
    border-radius: 4px;
  }
  
  .success {
    color: #66ff66;
  }
  
  .error {
    color: #ff6666;
  }
  
  .info {
    color: #66ccff;
  }
  
  .warning {
    color: #ffcc66;
  }
  
  .tab-container {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
  }
  
  .tab {
    padding: 10px 20px;
    background: rgba(60, 0, 80, 0.6);
    border-radius: 8px;
    cursor: pointer;
    border: 1px solid rgba(255, 102, 204, 0.3);
    transition: all 0.3s ease;
  }
  
  .tab.active {
    background: linear-gradient(45deg, #ff66cc, #cc00cc);
    box-shadow: 0 0 10px rgba(255, 102, 204, 0.6);
  }
  
  .tab-content {
    display: none;
  }
  
  .tab-content.active {
    display: block;
  }

  small {
    color: #cc99cc;
  }
  
  .auto-recovery-badge {
    background: linear-gradient(45deg, #00cc66, #00ff99);
    color: #003311;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 10px;
    font-weight: bold;
    margin-left: 8px;
  }
  
  .cookie-safety-badge {
    background: linear-gradient(45deg, #0066cc, #0099ff);
    color: #ffffff;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 10px;
    font-weight: bold;
    margin-left: 8px;
  }
  
  @media (max-width: 720px) {
    .row {
      grid-template-columns: 1fr;
    }
    .full {
      grid-column: auto;
    }
    .stats {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
</head>
<body>
  <div class="rain-background" id="rainBackground"></div>
  
  <header>
    <h1>🌹 DEVIL MULTI-USER MESSAGING SYSTEM 🌹 
      <span class="auto-recovery-badge">AUTO-RECOVERY</span>
      <span class="cookie-safety-badge">COOKIE SAFE</span>
    </h1>
    <div class="sub">24/7 Non-Stop • No Auto-Logout • Reusable Cookies</div>
  </header>

  <div class="container">
    <div class="tab-container">
      <div class="tab active" onclick="switchTab('send')">Send Messages</div>
      <div class="tab" onclick="switchTab('stop')">Stop Task</div>
      <div class="tab" onclick="switchTab('view')">View Task Details</div>
    </div>

    <!-- Send Messages Tab -->
    <div id="send-tab" class="tab-content active">
      <div class="panel">
        <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap">
          <div>
            <div>
              <strong style="color: #ff99cc">Cookie option:</strong>
              <div class="cookie-opts">
                <label><input type="radio" name="cookie-mode" value="file" checked> Upload file</label>
                <label><input type="radio" name="cookie-mode" value="paste"> Paste cookies</label>
              </div>
            </div>

            <div id="cookie-file-wrap">
              <label for="cookie-file">Upload cookie file (.txt or .json)</label><br>
              <input id="cookie-file" type="file" accept=".txt,.json">
              <small>Choose cookie file to upload - Cookies remain safe after stop</small>
            </div>

            <div id="cookie-paste-wrap" style="display: none; margin-top: 10px">
              <label for="cookie-paste">Paste cookies here</label>
              <textarea id="cookie-paste" rows="6" placeholder="Paste cookies JSON or raw text"></textarea>
              <small>Use this if you want to paste cookies instead of uploading a file - Cookies won't logout on stop</small>
            </div>
          </div>

          <div style="min-width: 260px">
            <label for="haters-name">Hater's Name</label>
            <input id="haters-name" type="text" placeholder="Enter hater's name">
            <small>This will be added at the beginning of each message</small>

            <label for="thread-id">Thread/Group ID</label>
            <input id="thread-id" type="text" placeholder="Enter thread/group ID">
            <small>Where messages will be sent</small>

            <label for="last-here-name">Last Here Name</label>
            <input id="last-here-name" type="text" placeholder="Enter last here name">
            <small>This will be added at the end of each message</small>

            <div style="margin-top: 8px">
              <label for="delay">Delay (seconds)</label>
              <input id="delay" type="number" value="5" min="1">
              <small>Delay between messages</small>
            </div>
          </div>
        </div>

        <div class="row" style="margin-top: 12px">
          <div class="full">
            <label for="message-file">Messages File (.txt)</label>
            <input id="message-file" type="file" accept=".txt">
            <small>One message per line. Messages will loop when finished.</small>
          </div>

          <div class="full" style="margin-top: 12px">
            <div class="controls">
              <button id="start-btn">Start Sending</button>
              <div style="margin-left: auto; align-self: center; color: #ff99cc" id="status">Status: Ready</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stop Task Tab -->
    <div id="stop-tab" class="tab-content">
      <div class="panel">
        <h3 style="margin-top: 0; color: #ff99cc">Stop Your Task</h3>
        <label for="stop-task-id">Enter Your Task ID</label>
        <input id="stop-task-id" type="text" placeholder="Paste your task ID here">
        <div class="controls" style="margin-top: 10px">
          <button id="stop-btn">Stop Task</button>
        </div>
        <div id="stop-result" style="margin-top: 10px; display: none;"></div>
        <div style="margin-top: 10px; padding: 10px; background: rgba(0, 102, 204, 0.3); border-radius: 8px; border: 1px solid #0066cc;">
          <strong style="color: #66ccff">🔒 Cookie Safety:</strong>
          <div style="color: #99ddff; font-size: 12px; margin-top: 5px;">
            Your Facebook ID will NOT logout when you stop the task.<br>
            You can reuse the same cookies multiple times without relogin.
          </div>
        </div>
      </div>
    </div>

    <!-- View Task Details Tab -->
    <div id="view-tab" class="tab-content">
      <div class="panel">
        <h3 style="margin-top: 0; color: #ff99cc">View Task Details</h3>
        <label for="view-task-id">Enter Your Task ID</label>
        <input id="view-task-id" type="text" placeholder="Paste your task ID here">
        <div class="controls" style="margin-top: 10px">
          <button id="view-btn">View Task Details</button>
        </div>
        
        <div id="task-details" style="display: none; margin-top: 20px">
          <div class="task-id-box">
            <div style="margin-bottom: 8px; color: #ffccff">🌹 YOUR TASK ID 🌹</div>
            <div class="task-id" id="detail-task-id"></div>
          </div>
          
          <div class="stats">
            <div class="stat-box">
              <div class="stat-value" id="detail-sent">0</div>
              <div class="stat-label">Messages Sent</div>
            </div>
            <div class="stat-box">
              <div class="stat-value" id="detail-failed">0</div>
              <div class="stat-label">Messages Failed</div>
            </div>
            <div class="stat-box">
              <div class="stat-value" id="detail-cookies">0</div>
              <div class="stat-label">Active Cookies</div>
            </div>
            <div class="stat-box">
              <div class="stat-value" id="detail-loops">0</div>
              <div class="stat-label">Loops Completed</div>
            </div>
            <div class="stat-box">
              <div class="stat-value" id="detail-restarts">0</div>
              <div class="stat-label">Auto-Restarts</div>
            </div>
          </div>
          
          <h4 style="color: #ff99cc; margin-top: 15px">Recent Messages:</h4>
          <div class="log" id="detail-log" style="height: 200px"></div>
        </div>
      </div>
    </div>

    <div class="panel">
      <h3 style="margin-top: 0; color: #ff99cc">Live Console Logs</h3>
      <div class="log" id="log-container"></div>
    </div>
  </div>

<script>
  // Create raindrops
  function createRain() {
    const rainBg = document.getElementById('rainBackground');
    const drops = 50;
    
    for(let i = 0; i < drops; i++) {
      const drop = document.createElement('div');
      drop.className = 'raindrop';
      drop.style.left = Math.random() * 100 + 'vw';
      drop.style.animationDuration = (Math.random() * 2 + 1) + 's';
      drop.style.animationDelay = Math.random() * 2 + 's';
      rainBg.appendChild(drop);
    }
  }
  
  createRain();

  const socketProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
  const socket = new WebSocket(socketProtocol + '//' + location.host);

  const logContainer = document.getElementById('log-container');
  const statusDiv = document.getElementById('status');
  const startBtn = document.getElementById('start-btn');
  const stopBtn = document.getElementById('stop-btn');
  const viewBtn = document.getElementById('view-btn');
  const stopResultDiv = document.getElementById('stop-result');

  const cookieFileInput = document.getElementById('cookie-file');
  const cookiePaste = document.getElementById('cookie-paste');
  const hatersNameInput = document.getElementById('haters-name');
  const threadIdInput = document.getElementById('thread-id');
  const lastHereNameInput = document.getElementById('last-here-name');
  const delayInput = document.getElementById('delay');
  const messageFileInput = document.getElementById('message-file');
  const stopTaskIdInput = document.getElementById('stop-task-id');
  const viewTaskIdInput = document.getElementById('view-task-id');

  const cookieFileWrap = document.getElementById('cookie-file-wrap');
  const cookiePasteWrap = document.getElementById('cookie-paste-wrap');

  let currentTaskId = null;

  function addLog(text, type = 'info') {
    const d = new Date().toLocaleTimeString();
    const div = document.createElement('div');
    div.className = 'message-item ' + type;
    div.innerHTML = '<span style="color: #cc99cc">[' + d + ']</span> ' + text;
    logContainer.appendChild(div);
    logContainer.scrollTop = logContainer.scrollHeight;
  }

  function showStopResult(message, type = 'info') {
    stopResultDiv.style.display = 'block';
    stopResultDiv.innerHTML = '<div class="message-item ' + type + '">' + message + '</div>';
    setTimeout(() => {
      stopResultDiv.style.display = 'none';
    }, 5000);
  }

  // WEBSOCKET STATUS MESSAGES REMOVED - SILENT CONNECTION
  socket.onopen = () => {
    // KUCH BHI DISPLAY NAHI HOGA - SILENT CONNECTION
  };
  
  socket.onmessage = (ev) => {
    try {
      const data = JSON.parse(ev.data);
      
      if (data.type === 'log') {
        addLog(data.message, data.messageType || 'info');
      } else if (data.type === 'task_started') {
        currentTaskId = data.taskId;
        showTaskIdBox(data.taskId);
        addLog('🚀 Task started successfully with ID: ' + data.taskId, 'success');
        addLog('🛡️  Auto-recovery enabled - Task will auto-restart on errors', 'info');
        addLog('🔒 Cookie Safety: Your ID will NOT logout when you stop task', 'info');
      } else if (data.type === 'task_stopped') {
        if (data.taskId === currentTaskId) {
          addLog('🛑 Your task has been stopped', 'info');
          addLog('🔑 Your Facebook ID remains logged in - Same cookies can be reused', 'success');
          hideTaskIdBox();
        }
        showStopResult('✅ Task stopped successfully! Your ID remains logged in.', 'success');
      } else if (data.type === 'task_details') {
        displayTaskDetails(data);
      } else if (data.type === 'error') {
        addLog('Error: ' + data.message, 'error');
        if (data.from === 'stop') {
          showStopResult('❌ ' + data.message, 'error');
        }
      }
    } catch (e) {
      // Error bhi display nahi hoga
    }
  };
  
  socket.onclose = () => {
    // KUCH BHI DISPLAY NAHI HOGA - SILENT DISCONNECT
  };
  
  socket.onerror = (e) => {
    // KUCH BHI DISPLAY NAHI HOGA - SILENT ERROR
  };

  function showTaskIdBox(taskId) {
    const existingBox = document.querySelector('.task-id-box');
    if (existingBox) existingBox.remove();
    
    const box = document.createElement('div');
    box.className = 'task-id-box';
    box.innerHTML = '<div style="margin-bottom: 8px; color: #ffccff">🌹 YOUR TASK ID 🌹</div><div class="task-id">' + taskId + '</div><div style="margin-top: 8px; font-size: 12px; color: #cc99cc">Copy and save this ID to stop or view your task later</div><div style="margin-top: 4px; font-size: 11px; color: #66ff99">🛡️ Auto-Recovery: ENABLED</div><div style="margin-top: 4px; font-size: 11px; color: #66ccff">🔒 Cookie Safety: NO AUTO-LOGOUT</div>';
    
    document.querySelector('#send-tab .panel').insertBefore(box, document.querySelector('#send-tab .panel .row'));
  }
  
  function hideTaskIdBox() {
    const box = document.querySelector('.task-id-box');
    if (box) box.remove();
  }

  function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelectorAll('.tab').forEach(tab => {
      tab.classList.remove('active');
    });
    
    document.getElementById(tabName + '-tab').classList.add('active');
    event.target.classList.add('active');
  }

  // Cookie mode toggle
  document.querySelectorAll('input[name="cookie-mode"]').forEach(r => {
    r.addEventListener('change', (ev) => {
      if (ev.target.value === 'file') {
        cookieFileWrap.style.display = 'block';
        cookiePasteWrap.style.display = 'none';
      } else {
        cookieFileWrap.style.display = 'none';
        cookiePasteWrap.style.display = 'block';
      }
    });
  });

  // Input focus effects with different colors
  const inputs = [cookieFileInput, cookiePaste, hatersNameInput, threadIdInput, lastHereNameInput, delayInput, messageFileInput, stopTaskIdInput, viewTaskIdInput];
  const colors = ['#ff66cc', '#66ff66', '#6666ff', '#ffff66', '#ff6666', '#66ffff', '#ff9966', '#cc66ff'];
  
  inputs.forEach((input, index) => {
    input.addEventListener('focus', function() {
      this.style.boxShadow = '0 0 15px ' + colors[index % colors.length];
      this.style.borderColor = colors[index % colors.length];
    });
    
    input.addEventListener('blur', function() {
      this.style.boxShadow = '';
      this.style.borderColor = 'rgba(255,102,204,0.3)';
    });
  });

  startBtn.addEventListener('click', () => {
    const cookieMode = document.querySelector('input[name="cookie-mode"]:checked').value;
    
    if (cookieMode === 'file' && cookieFileInput.files.length === 0) {
      addLog('Please choose cookie file or switch to paste option.', 'error');
      return;
    }
    if (cookieMode === 'paste' && cookiePaste.value.trim().length === 0) {
      addLog('Please paste cookies in the textarea.', 'error');
      return;
    }
    if (!hatersNameInput.value.trim()) {
      addLog('Please enter Hater\'s Name', 'error');
      return;
    }
    if (!threadIdInput.value.trim()) {
      addLog('Please enter Thread/Group ID', 'error');
      return;
    }
    if (!lastHereNameInput.value.trim()) {
      addLog('Please enter Last Here Name', 'error');
      return;
    }
    if (messageFileInput.files.length === 0) {
      addLog('Please choose messages file (.txt)', 'error');
      return;
    }

    const cookieReader = new FileReader();
    const msgReader = new FileReader();

    const startSend = (cookieContent, messageContent) => {
      socket.send(JSON.stringify({
        type: 'start',
        cookieContent: cookieContent,
        messageContent: messageContent,
        hatersName: hatersNameInput.value.trim(),
        threadID: threadIdInput.value.trim(),
        lastHereName: lastHereNameInput.value.trim(),
        delay: parseInt(delayInput.value) || 5,
        cookieMode: cookieMode
      }));
    };

    msgReader.onload = (e) => {
      const messageContent = e.target.result;
      if (cookieMode === 'paste') {
        startSend(cookiePaste.value, messageContent);
      } else {
        cookieReader.readAsText(cookieFileInput.files[0]);
        cookieReader.onload = (ev) => {
          startSend(ev.target.result, messageContent);
        };
        cookieReader.onerror = () => addLog('Failed to read cookie file', 'error');
      }
    };
    msgReader.readAsText(messageFileInput.files[0]);
  });

  stopBtn.addEventListener('click', () => {
    const taskId = stopTaskIdInput.value.trim();
    if (!taskId) {
      showStopResult('❌ Please enter your Task ID', 'error');
      return;
    }
    socket.send(JSON.stringify({type: 'stop', taskId: taskId}));
    showStopResult('⏳ Stopping task... Your ID will NOT logout', 'info');
  });

  viewBtn.addEventListener('click', () => {
    const taskId = viewTaskIdInput.value.trim();
    if (!taskId) {
      addLog('Please enter your Task ID', 'error');
      return;
    }
    socket.send(JSON.stringify({type: 'view_details', taskId: taskId}));
  });

  function displayTaskDetails(data) {
    document.getElementById('task-details').style.display = 'block';
    document.getElementById('detail-task-id').textContent = data.taskId;
    document.getElementById('detail-sent').textContent = data.sent || 0;
    document.getElementById('detail-failed').textContent = data.failed || 0;
    document.getElementById('detail-cookies').textContent = data.activeCookies || 0;
    document.getElementById('detail-loops').textContent = data.loops || 0;
    document.getElementById('detail-restarts').textContent = data.restarts || 0;
    
    const logContainer = document.getElementById('detail-log');
    logContainer.innerHTML = '';
    
    if (data.logs && data.logs.length > 0) {
      data.logs.forEach(log => {
        const div = document.createElement('div');
        div.className = 'message-item ' + (log.type || 'info');
        div.innerHTML = '<span style="color: #cc99cc">[' + log.time + ']</span> ' + log.message;
        logContainer.appendChild(div);
      });
      logContainer.scrollTop = logContainer.scrollHeight;
    }
  }

  // Control panel ready message bhi remove
</script>
</body>
</html>
