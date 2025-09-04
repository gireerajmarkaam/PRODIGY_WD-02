        let startTime;
        let elapsedTime = 0;
        let timerInterval;
        let isRunning = false;
        
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        const millisecondsElement = document.getElementById('milliseconds');
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const resetBtn = document.getElementById('resetBtn');
        
        function formatTime(time) {
            return time < 10 ? '0' + time : time;
        }
        
        function formatMilliseconds(ms) {
            return ms < 10 ? '0' + ms : ms;
        }
        
        function updateDisplay() {
            const currentTime = Date.now();
            elapsedTime = currentTime - startTime;
            
            const milliseconds = Math.floor(elapsedTime % 1000 / 10);
            const seconds = Math.floor(elapsedTime / 1000) % 60;
            const minutes = Math.floor(elapsedTime / 1000 / 60);
            
            millisecondsElement.textContent = '.' + formatMilliseconds(milliseconds);
            secondsElement.textContent = formatTime(seconds);
            minutesElement.textContent = formatTime(minutes);
        }
        
        function startStopwatch() {
            if (!isRunning) {
                startTime = Date.now() - elapsedTime;
                timerInterval = setInterval(updateDisplay, 10);
                isRunning = true;
            }
        }
        
        function pauseStopwatch() {
            if (isRunning) {
                clearInterval(timerInterval);
                isRunning = false;
            }
        }
        
        function resetStopwatch() {
            clearInterval(timerInterval);
            isRunning = false;
            elapsedTime = 0;
            
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            millisecondsElement.textContent = '.00';
        }
        
        startBtn.addEventListener('click', startStopwatch);
        pauseBtn.addEventListener('click', pauseStopwatch);
        resetBtn.addEventListener('click', resetStopwatch);
        
        // Keyboard shortcuts
        document.addEventListener('keydown', function(event) {
            if (event.code === 'Space') {
                event.preventDefault();
                if (isRunning) {
                    pauseStopwatch();
                } else {
                    startStopwatch();
                }
            } else if (event.code === 'KeyR') {
                event.preventDefault();
                resetStopwatch();
            }
        });
    