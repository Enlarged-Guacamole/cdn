        const serverIPs = [
            "142.4.219.211:2061",
            "192.99.34.30:2226",
            "kmg.scalacube.vip",
        ];

        async function fetchServerStatus(serverIp) {
            const url = `https://api.mcsrvstat.us/3/${serverIp}`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                displayServerStatus(data);
            } catch (error) {
                console.error('Error fetching server status:', error);
                addServerBox(serverIp, "Error fetching server status.", "0/0");
            }
        }

        function displayServerStatus(data) {
            const serverIp = data.ip;
            const playerCount = data.online ? `${data.players.online}/${data.players.max}` : "0/0";
            addServerBox(serverIp, data.online ? "Online" : "Offline", playerCount, data.favicon);
        }

        function addServerBox(serverIp, status, playerCount, faviconUrl = "") {
            const container = document.getElementById('servers-container');
            const box = document.createElement('div');
            box.className = 'server-box';

            box.innerHTML = `
                <img src="${faviconUrl || 'https://cdn.pixabay.com/photo/2013/07/12/19/25/minecraft-154749_1280.png'}" id="server-icon" alt="Server Icon"/>
                <h1>${serverIp}</h1>
                <div>${status}</div>
                <div><span id="player-count">${playerCount}</span> Players Online</div>
            `;
            container.appendChild(box);
        }
        serverIPs.forEach(fetchServerStatus);
