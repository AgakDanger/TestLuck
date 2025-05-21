 // IP & Location
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                document.getElementById('ip').textContent = data.ip || 'N/A';
                document.getElementById('location').textContent = 
                    data.city && data.country_name 
                        ? `${data.city}, ${data.country_name}` 
                        : 'N/A';
            })
            .catch(() => {
                document.getElementById('ip').textContent = 'N/A';
                document.getElementById('location').textContent = 'N/A';
            });

        // Browser
        function getBrowser() {
            const ua = navigator.userAgent;
            if (ua.indexOf("Firefox") > -1) return "Mozilla Firefox";
            if (ua.indexOf("Edg") > -1) return "Microsoft Edge";
            if (ua.indexOf("Chrome") > -1) return "Google Chrome";
            if (ua.indexOf("Safari") > -1) return "Safari";
            if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) return "Opera";
            return "Unknown";
        }
        document.getElementById('browser').textContent = getBrowser();

        // Entrance (referrer)
        document.getElementById('entrance').textContent = document.referrer || 'Direct';

        // Exit (simulate with beforeunload event)
        let exitUrl = 'Not exited yet';
        window.addEventListener('beforeunload', function (e) {
            exitUrl = window.location.href;
            localStorage.setItem('lastExit', exitUrl);
        });
        // Show last exit if available
        document.getElementById('exit').textContent = localStorage.getItem('lastExit') || 'N/A';
