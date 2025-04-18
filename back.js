const packetList = document.getElementById('packet-list');
const alertList = document.getElementById('alert-list');

function generatePacket() {
  const ip = `192.168.0.${Math.floor(Math.random() * 255)}`;
  const dest = `10.0.0.${Math.floor(Math.random() * 255)}`;
  const port = [22, 80, 443, 3389, 23][Math.floor(Math.random() * 5)];
  return {
    timestamp: new Date().toLocaleTimeString(),
    source: ip,
    destination: dest,
    port
  };
}

function detectIntrusion(packet) {
  // Simple simulated rules
  if (packet.port === 23 || packet.port === 3389) {
    return `Suspicious port access detected on port ${packet.port} from ${packet.source}`;
  }
  return null;
}

function updateFeed(packet) {
  const li = document.createElement('li');
  li.textContent = `[${packet.timestamp}] ${packet.source} → ${packet.destination} (Port: ${packet.port})`;
  packetList.prepend(li);

  const alert = detectIntrusion(packet);
  if (alert) {
    const alertItem = document.createElement('li');
    alertItem.className = 'alert';
    alertItem.textContent = `[${packet.timestamp}] ALERT: ${alert}`;
    alertList.prepend(alertItem);
  }

  // Limit to 50 items
  if (packetList.children.length > 50) packetList.removeChild(packetList.lastChild);
  if (alertList.children.length > 20) alertList.removeChild(alertList.lastChild);
}

// Simulate packet feed every second
setInterval(() => {
  const packet = generatePacket();
  updateFeed(packet);
}, 1000);
