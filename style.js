    async function fetchJson(url) {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    }

    async function displayInfo() {
      const infoDiv = document.getElementById('info');
      const sendingDiv = document.getElementById('sending');
      try {
        // Get IP address
        const ipData = await fetchJson('https://api.ipify.org?format=json');

        // Get location info using ip-api
        const geoData = await fetchJson('https://ip-api.com/json/' + ipData.ip);

        // Get user agent
        const userAgent = navigator.userAgent;

        // Clear loading text
        infoDiv.innerHTML = '';

        const items = [
          { label: 'IP Address', value: ipData.ip },
          { label: 'Country', value: geoData.country || 'N/A' },
          { label: 'Region', value: geoData.regionName || 'N/A' },
          { label: 'City', value: geoData.city || 'N/A' },
          { label: 'ZIP Code', value: geoData.zip || 'N/A' },
          { label: 'Timezone', value: geoData.timezone || 'N/A' },
          { label: 'ISP', value: geoData.isp || 'N/A' },
          { label: 'Browser Info', value: userAgent }
        ];

        items.forEach(({ label, value }) => {
          const itemDiv = document.createElement('div');
          itemDiv.className = 'info-item';

          const labelDiv = document.createElement('div');
          labelDiv.className = 'label';
          labelDiv.textContent = label;

          const valueDiv = document.createElement('div');
          valueDiv.className = 'value';
          valueDiv.textContent = value;

          itemDiv.appendChild(labelDiv);
          itemDiv.appendChild(valueDiv);
          infoDiv.appendChild(itemDiv);
        });

        infoDiv.setAttribute('aria-busy', 'false');

        // Show fake sending message after info loads
        sendingDiv.style.display = 'block';

      } catch (error) {
        infoDiv.innerHTML = '<p class="loading">Failed to load information. Please check your internet connection.</p>';
        console.error(error);
      }
    }

    displayInfo();
