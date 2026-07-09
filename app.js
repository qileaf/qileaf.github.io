const locations = [
  { id: "och", label: "OCH", category: "Hospital / tower", x: 885, y: 285, badge: "O", detail: "OCH" },
  { id: "emergency", label: "Emergency", category: "Emergency", x: 790, y: 565, badge: "+", detail: "Emergency" },
  { id: "block3", label: "Block 3", category: "SGH block", x: 750, y: 420, badge: "3", detail: "Block 3" },
  { id: "block4", label: "Block 4", category: "SGH block", x: 625, y: 440, badge: "4", detail: "Block 4" },
  { id: "block5", label: "Block 5", category: "SGH block", x: 565, y: 320, badge: "5", detail: "Block 5" },
  { id: "block6", label: "Block 6", category: "SGH block", x: 665, y: 225, badge: "6", detail: "Block 6" },
  { id: "block7", label: "Block 7", category: "SGH block", x: 760, y: 155, badge: "7", detail: "Block 7" },
  { id: "mrt_exit_6", label: "MRT Exit 6", category: "Transit", x: 105, y: 130, badge: "6", detail: "MRT Exit 6" },
  { id: "mrt_exit_7", label: "MRT Exit 7", category: "Transit", x: 120, y: 520, badge: "7", detail: "MRT Exit 7" },
  { id: "nccs", label: "NCCS", category: "Specialty centre", x: 305, y: 425, badge: "N", detail: "NCCS" },
  { id: "academia", label: "Academia", category: "Research / education", x: 475, y: 425, badge: "A", detail: "Academia" },
  { id: "snec", label: "SNEC", category: "Specialty centre", x: 320, y: 565, badge: "E", detail: "SNEC" },
  { id: "nhs", label: "NHS", category: "Specialty centre", x: 875, y: 485, badge: "H", detail: "NHS" }
];

const nodeById = Object.fromEntries(locations.map((node) => [node.id, node]));

const mapZones = [
  { x: 42, y: 58, width: 165, height: 525, label: "MRT access" },
  { x: 248, y: 360, width: 290, height: 245, label: "NCCS / SNEC / Academia" },
  { x: 525, y: 185, width: 295, height: 300, label: "SGH blocks" },
  { x: 820, y: 245, width: 145, height: 285, label: "OCH / NHS" },
  { x: 700, y: 525, width: 165, height: 75, label: "Emergency" }
];

const accessibleEdges = [
  {
    from: "mrt_exit_6", to: "mrt_exit_7", mode: "MRT concourse with lifts", meters: 320, rollMeters: 320, minutes: 8,
    sheltered: true, indoor: true,
    instruction: "Use the station concourse and lifts to move between MRT Exit 6 and MRT Exit 7."
  },
  {
    from: "mrt_exit_7", to: "nccs", mode: "sheltered step-free walkway", meters: 180, rollMeters: 180, minutes: 5,
    sheltered: true,
    instruction: "From MRT Exit 7, follow the sheltered step-free walkway toward NCCS."
  },
  {
    from: "mrt_exit_7", to: "snec", mode: "sheltered step-free walkway", meters: 230, rollMeters: 230, minutes: 7,
    sheltered: true,
    instruction: "From MRT Exit 7, continue along the sheltered step-free walkway toward SNEC."
  },
  {
    from: "nccs", to: "snec", mode: "covered step-free connector", meters: 145, rollMeters: 145, minutes: 5,
    sheltered: true,
    instruction: "Follow the covered step-free connector between NCCS and SNEC."
  },
  {
    from: "nccs", to: "academia", mode: "step-free campus path", meters: 160, rollMeters: 160, minutes: 5,
    sheltered: false,
    instruction: "Use the step-free campus path from NCCS toward Academia."
  },
  {
    from: "snec", to: "academia", mode: "step-free campus path", meters: 210, rollMeters: 210, minutes: 7,
    sheltered: false,
    instruction: "Use the step-free campus path between SNEC and Academia."
  },
  {
    from: "academia", to: "block5", mode: "step-free campus connector", meters: 170, rollMeters: 170, minutes: 6,
    sheltered: false,
    instruction: "Continue on the step-free campus connector from Academia to Block 5."
  },
  {
    from: "nccs", to: "block5", mode: "step-free campus path", meters: 210, rollMeters: 210, minutes: 7,
    sheltered: false,
    instruction: "Use the step-free campus path from NCCS toward Block 5."
  },
  {
    from: "academia", to: "block4", mode: "step-free campus connector", meters: 190, rollMeters: 190, minutes: 6,
    sheltered: false,
    instruction: "Follow the step-free connector from Academia toward Block 4."
  },
  {
    from: "block5", to: "block4", mode: "step-free indoor / covered link", meters: 120, rollMeters: 120, minutes: 4,
    sheltered: true, indoor: true,
    instruction: "Use the level indoor or covered connector between Block 5 and Block 4."
  },
  {
    from: "block4", to: "block3", mode: "step-free indoor / covered link", meters: 110, rollMeters: 110, minutes: 4,
    sheltered: true, indoor: true,
    instruction: "Follow the step-free covered corridor between Block 4 and Block 3."
  },
  {
    from: "block3", to: "block5", mode: "step-free indoor / covered link", meters: 125, rollMeters: 125, minutes: 4,
    sheltered: true, indoor: true,
    instruction: "Use the internal step-free connector between Block 3 and Block 5."
  },
  {
    from: "block5", to: "block6", mode: "step-free lobby / pavement link", meters: 115, rollMeters: 115, minutes: 4,
    sheltered: true,
    instruction: "Use the level-access link from Block 5 toward Block 6."
  },
  {
    from: "block6", to: "block7", mode: "step-free covered block link", meters: 95, rollMeters: 95, minutes: 3,
    sheltered: true,
    instruction: "Continue along the step-free covered link between Block 6 and Block 7."
  },
  {
    from: "block7", to: "emergency", mode: "step-free campus path", meters: 220, rollMeters: 220, minutes: 8,
    sheltered: false,
    instruction: "Use the step-free campus path from Block 7 toward Emergency."
  },
  {
    from: "block3", to: "och", mode: "link bridge with lifts", meters: 190, rollMeters: 190, minutes: 7,
    sheltered: true, indoor: true,
    instruction: "Take the lift-accessible link bridge between Block 3 and OCH."
  },
  {
    from: "block6", to: "och", mode: "step-free campus connector", meters: 190, rollMeters: 190, minutes: 7,
    sheltered: false,
    instruction: "Use the step-free campus connector between Block 6 and OCH."
  },
  {
    from: "och", to: "nhs", mode: "step-free campus path", meters: 165, rollMeters: 165, minutes: 6,
    sheltered: false,
    instruction: "Use the step-free path between OCH and NHS."
  },
  {
    from: "block4", to: "nhs", mode: "pedestrian underpass / lift lobby", meters: 185, rollMeters: 185, minutes: 6,
    sheltered: true, indoor: true,
    instruction: "Use the sheltered step-free underpass or lift-lobby connection from Block 4 toward NHS."
  },
  {
    from: "block3", to: "nhs", mode: "step-free covered connector", meters: 175, rollMeters: 175, minutes: 6,
    sheltered: true, indoor: true,
    instruction: "Follow the covered step-free connector from Block 3 toward NHS."
  },
  {
    from: "nhs", to: "emergency", mode: "step-free campus path", meters: 155, rollMeters: 155, minutes: 5,
    sheltered: false,
    instruction: "Follow the step-free route between NHS and Emergency."
  },

  // Wheelchair shuttle links from MRT Exit 6 to SGH campus drop-off points used in this prototype.
  {
    from: "mrt_exit_6", to: "nccs", mode: "wheelchair shuttle", meters: 640, rollMeters: 35, minutes: 30,
    sheltered: true, shuttle: true,
    instruction: "Request the wheelchair shuttle at MRT Exit 6 and alight at NCCS."
  },
  {
    from: "mrt_exit_6", to: "snec", mode: "wheelchair shuttle", meters: 760, rollMeters: 35, minutes: 30,
    sheltered: true, shuttle: true,
    instruction: "Request the wheelchair shuttle at MRT Exit 6 and alight at SNEC."
  },
  {
    from: "mrt_exit_6", to: "block5", mode: "wheelchair shuttle", meters: 880, rollMeters: 35, minutes: 30,
    sheltered: true, shuttle: true,
    instruction: "Request the wheelchair shuttle at MRT Exit 6 and alight at Block 5."
  },
  {
    from: "mrt_exit_6", to: "och", mode: "wheelchair shuttle", meters: 910, rollMeters: 35, minutes: 30,
    sheltered: true, shuttle: true,
    instruction: "Request the wheelchair shuttle at MRT Exit 6 and alight at OCH."
  },
  {
    from: "mrt_exit_6", to: "nhs", mode: "wheelchair shuttle", meters: 1030, rollMeters: 35, minutes: 30,
    sheltered: true, shuttle: true,
    instruction: "Request the wheelchair shuttle at MRT Exit 6 and alight near NHS."
  },
  {
    from: "mrt_exit_6", to: "emergency", mode: "wheelchair shuttle", meters: 1180, rollMeters: 35, minutes: 30,
    sheltered: true, shuttle: true,
    instruction: "Request the wheelchair shuttle at MRT Exit 6 and alight at Emergency."
  }
];

const blockedEdges = [
  {
    from: "mrt_exit_6", to: "nccs",
    label: "Direct Exit 6 campus diversion excluded",
    reason: "The routing engine excludes this direct path and instead uses MRT Exit 7 or the wheelchair shuttle."
  }
];

let currentRoute = null;
let routeWasRequested = false;

function populateSelects() {
  const startSelect = document.getElementById("startSelect");
  const endSelect = document.getElementById("endSelect");

  [startSelect, endSelect].forEach((select) => {
    select.innerHTML = "";
    locations.forEach((node) => {
      const option = document.createElement("option");
      option.value = node.id;
      option.textContent = node.label;
      select.appendChild(option);
    });
  });

  startSelect.value = "mrt_exit_7";
  endSelect.value = "nccs";
}

function costFor(edge, preference) {
  if (preference === "fastest") return edge.minutes;
  if (preference === "avoidShuttle") return edge.minutes + (edge.shuttle ? 10000 : 0);
  return (edge.rollMeters / 45) + (edge.shuttle ? 1.5 : 0) + (edge.sheltered ? 0 : 0.9) + (edge.minutes / 30);
}

function makeAdjacency(edges) {
  const adjacency = new Map(locations.map((node) => [node.id, []]));
  edges.forEach((edge, index) => {
    adjacency.get(edge.from).push({ ...edge, index, direction: "forward", neighbor: edge.to });
    adjacency.get(edge.to).push({ ...edge, index, direction: "reverse", neighbor: edge.from });
  });
  return adjacency;
}

function shortestPath(startId, endId, preference, allowShuttle = true) {
  const shuttleIsRelevant = startId === "mrt_exit_6" || endId === "mrt_exit_6";
  const candidateEdges = accessibleEdges.filter((edge) => !edge.shuttle || (allowShuttle && shuttleIsRelevant));
  const adjacency = makeAdjacency(candidateEdges);
  const distances = new Map(locations.map((node) => [node.id, Infinity]));
  const previous = new Map();
  const queue = new Set(locations.map((node) => node.id));
  distances.set(startId, 0);

  while (queue.size) {
    let current = null;
    let currentDistance = Infinity;

    queue.forEach((nodeId) => {
      const distance = distances.get(nodeId);
      if (distance < currentDistance) {
        currentDistance = distance;
        current = nodeId;
      }
    });

    if (current === null || currentDistance === Infinity) break;
    if (current === endId) break;
    queue.delete(current);

    adjacency.get(current).forEach((edge) => {
      if (!queue.has(edge.neighbor)) return;
      const alternative = currentDistance + costFor(edge, preference);
      if (alternative < distances.get(edge.neighbor)) {
        distances.set(edge.neighbor, alternative);
        previous.set(edge.neighbor, { nodeId: current, edge });
      }
    });
  }

  if (!previous.has(endId) && startId !== endId) return null;

  const routeNodes = [endId];
  const routeEdges = [];
  let cursor = endId;
  while (cursor !== startId) {
    const prev = previous.get(cursor);
    if (!prev) break;
    routeEdges.unshift(prev.edge);
    routeNodes.unshift(prev.nodeId);
    cursor = prev.nodeId;
  }

  return { nodes: routeNodes, edges: routeEdges, usedFallback: false };
}

function findRoute(startId, endId, preference) {
  if (startId === endId) return { nodes: [startId], edges: [], samePoint: true };

  if (preference === "avoidShuttle") {
    const noShuttleRoute = shortestPath(startId, endId, preference, false);
    if (noShuttleRoute) return noShuttleRoute;

    const fallback = shortestPath(startId, endId, "fastest", true);
    if (fallback) fallback.usedFallback = true;
    return fallback;
  }

  return shortestPath(startId, endId, preference, true);
}

function formatMeters(meters) {
  if (meters >= 1000) return `${(meters / 1000).toFixed(1)} km`;
  return `${Math.round(meters)} m`;
}

function formatMinutes(minutes) {
  if (minutes < 60) return `${Math.round(minutes)} min`;
  const hours = Math.floor(minutes / 60);
  const remainder = Math.round(minutes % 60);
  return remainder ? `${hours} hr ${remainder} min` : `${hours} hr`;
}

function edgeEndpoints(edge) {
  const start = nodeById[edge.direction === "reverse" ? edge.to : edge.from];
  const end = nodeById[edge.direction === "reverse" ? edge.from : edge.to];
  return { start, end };
}

function renderIdleSummary() {
  const summary = document.getElementById("routeSummary");
  const steps = document.getElementById("routeSteps");
  const start = nodeById[document.getElementById("startSelect").value];
  const end = nodeById[document.getElementById("endSelect").value];

  summary.innerHTML = `
    <div class="notice">
      Pins are set from <strong>${start.label}</strong> to <strong>${end.label}</strong>. Press <strong>Route Now</strong> to overlay the wheelchair-accessible route on the map.
    </div>
    <div class="badge-row">
      <span class="chip">Map always visible</span>
      <span class="chip">Step-free links only</span>
      <span class="chip">Route hidden until requested</span>
    </div>
  `;
  steps.innerHTML = "";
}

function renderRoute(route) {
  currentRoute = route;
  routeWasRequested = true;
  drawMap();

  const summary = document.getElementById("routeSummary");
  const steps = document.getElementById("routeSteps");
  summary.innerHTML = "";
  steps.innerHTML = "";

  if (!route) {
    summary.innerHTML = `<div class="notice"><strong>No route found.</strong> The prototype graph could not connect those two points using wheelchair-accessible segments.</div>`;
    return;
  }

  if (route.samePoint) {
    const node = nodeById[route.nodes[0]];
    summary.innerHTML = `<div class="notice"><strong>You are already at ${node.label}.</strong> Choose a different endpoint to generate route steps.</div>`;
    return;
  }

  const totalMinutes = route.edges.reduce((sum, edge) => sum + edge.minutes, 0);
  const totalRoll = route.edges.reduce((sum, edge) => sum + edge.rollMeters, 0);
  const totalDistance = route.edges.reduce((sum, edge) => sum + edge.meters, 0);
  const usesShuttle = route.edges.some((edge) => edge.shuttle);
  const fullySheltered = route.edges.every((edge) => edge.sheltered);
  const indoor = route.edges.some((edge) => edge.indoor);
  const start = nodeById[route.nodes[0]];
  const end = nodeById[route.nodes[route.nodes.length - 1]];

  const template = document.getElementById("summaryTemplate").content.cloneNode(true);
  template.querySelector('[data-field="time"]').textContent = formatMinutes(totalMinutes);
  template.querySelector('[data-field="roll"]').textContent = formatMeters(totalRoll);
  template.querySelector('[data-field="segments"]').textContent = route.edges.length;
  summary.appendChild(template);

  const chips = document.createElement("div");
  chips.className = "badge-row";
  chips.innerHTML = [
    `${start.label} → ${end.label}`,
    "Wheelchair-accessible only",
    "No stairs",
    usesShuttle ? "Includes wheelchair shuttle" : "Roll/walk route only",
    fullySheltered ? "Fully sheltered / indoor" : "Some outdoor links",
    indoor ? "Uses indoor/lift connector" : null,
    route.usedFallback ? "Shuttle fallback used" : null
  ].filter(Boolean).map((chip) => `<span class="chip route-ready">${chip}</span>`).join("");
  summary.appendChild(chips);

  const extra = document.createElement("div");
  extra.className = "notice";
  extra.innerHTML = usesShuttle
    ? `<strong>Shuttle note:</strong> Shuttle links are treated as wheelchair-accessible in this demo, with placeholder waiting/boarding time included. Total campus travel distance represented: ${formatMeters(totalDistance)}.`
    : `<strong>Route note:</strong> This route avoids shuttle links and uses only step-free connectors in the prototype graph. Total route distance represented: ${formatMeters(totalDistance)}.`;
  summary.appendChild(extra);

  route.edges.forEach((edge) => {
    const { start: edgeStart, end: edgeEnd } = edgeEndpoints(edge);
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <div class="step-main">${edgeStart.label} → ${edgeEnd.label}</div>
        <div class="step-meta"><span class="step-mode">${edge.mode}</span> · ${formatMinutes(edge.minutes)} · rolling distance ${formatMeters(edge.rollMeters)}</div>
        <div class="step-meta">${edge.instruction}</div>
      </div>
    `;
    steps.appendChild(li);
  });
}

function drawMap() {
  const zoneLayer = document.getElementById("zoneLayer");
  const edgeLayer = document.getElementById("edgeLayer");
  const routeLayer = document.getElementById("routeLayer");
  const nodeLayer = document.getElementById("nodeLayer");
  const blockedLayer = document.getElementById("blockedLayer");

  zoneLayer.innerHTML = "";
  edgeLayer.innerHTML = "";
  routeLayer.innerHTML = "";
  nodeLayer.innerHTML = "";
  blockedLayer.innerHTML = "";

  drawZones(zoneLayer);
  accessibleEdges.forEach((edge) => drawEdge(edgeLayer, edge, edge.shuttle ? "edge-line shuttle" : "edge-line"));
  blockedEdges.forEach((edge) => drawBlockedEdge(blockedLayer, edge));

  if (routeWasRequested && currentRoute?.edges?.length) {
    currentRoute.edges.forEach((edge) => drawRouteEdge(routeLayer, edge));
  }

  locations.forEach((node) => drawNode(nodeLayer, node));
}

function drawZones(layer) {
  mapZones.forEach((zone) => {
    const group = makeSvg("g", { class: "map-zone" });
    group.appendChild(makeSvg("rect", {
      x: zone.x,
      y: zone.y,
      width: zone.width,
      height: zone.height,
      rx: 22,
      class: "zone"
    }));
    const label = makeSvg("text", {
      x: zone.x + 18,
      y: zone.y + 26,
      class: "zone-label"
    });
    label.textContent = zone.label;
    group.appendChild(label);
    layer.appendChild(group);
  });
}

function drawBlockedEdge(layer, edge) {
  const from = nodeById[edge.from];
  const to = nodeById[edge.to];
  const line = makeSvg("line", {
    x1: from.x + 8,
    y1: from.y + 10,
    x2: to.x - 8,
    y2: to.y - 10,
    class: "blocked-line"
  });
  const label = makeSvg("text", {
    x: (from.x + to.x) / 2 - 70,
    y: (from.y + to.y) / 2 - 22,
    class: "blocked-note"
  });
  label.textContent = "Exit 6 direct path excluded";
  layer.append(line, label);
}

function drawEdge(layer, edge, className) {
  const from = nodeById[edge.from];
  const to = nodeById[edge.to];
  const line = makeSvg("line", {
    x1: from.x,
    y1: from.y,
    x2: to.x,
    y2: to.y,
    class: className
  });
  layer.appendChild(line);
}

function drawRouteEdge(layer, edge) {
  const { start, end } = edgeEndpoints(edge);
  const glow = makeSvg("line", {
    x1: start.x,
    y1: start.y,
    x2: end.x,
    y2: end.y,
    class: "route-glow"
  });
  const line = makeSvg("line", {
    x1: start.x,
    y1: start.y,
    x2: end.x,
    y2: end.y,
    class: edge.shuttle ? "route-line shuttle" : "route-line"
  });
  layer.append(glow, line);
}

function drawNode(layer, node) {
  const group = makeSvg("g", {
    class: `map-node${selectedClass(node.id)}`,
    role: "button",
    tabindex: "0",
    "aria-label": `Set destination to ${node.label}`,
    "data-node": node.id
  });

  group.append(
    makeSvg("circle", { class: "outer", cx: node.x, cy: node.y, r: 19 }),
    makeSvg("circle", { class: "inner", cx: node.x, cy: node.y, r: 13 }),
    makeSvg("text", { class: "badge", x: node.x, y: node.y + 0.5 })
  );
  group.querySelector("text.badge").textContent = node.badge;

  const labelPosition = labelOffsetFor(node);
  const label = makeSvg("text", {
    class: "label",
    x: node.x + labelPosition.x,
    y: node.y + labelPosition.y,
    "text-anchor": labelPosition.anchor
  });
  label.textContent = node.label;
  group.appendChild(label);

  if (node.id === document.getElementById("startSelect")?.value) {
    group.appendChild(makePin(node, "S", "start", -33));
  }
  if (node.id === document.getElementById("endSelect")?.value) {
    group.appendChild(makePin(node, "E", "end", 33));
  }

  group.addEventListener("click", () => handleNodePick(node.id));
  group.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleNodePick(node.id);
    }
  });
  layer.appendChild(group);
}

function makePin(node, text, type, dx) {
  const group = makeSvg("g", { class: `pin ${type}` });
  group.appendChild(makeSvg("circle", { class: `pin-bubble ${type}`, cx: node.x + dx, cy: node.y - 29, r: 13 }));
  const label = makeSvg("text", { class: "pin-label", x: node.x + dx, y: node.y - 28.5 });
  label.textContent = text;
  group.appendChild(label);
  return group;
}

function labelOffsetFor(node) {
  const special = {
    mrt_exit_6: { x: -28, y: -27, anchor: "start" },
    mrt_exit_7: { x: -28, y: 42, anchor: "start" },
    snec: { x: 0, y: 42, anchor: "middle" },
    emergency: { x: 0, y: 42, anchor: "middle" },
    block7: { x: 0, y: -30, anchor: "middle" },
    och: { x: 30, y: -28, anchor: "end" },
    nhs: { x: 28, y: 42, anchor: "end" }
  };
  return special[node.id] || { x: 0, y: -28, anchor: "middle" };
}

function selectedClass(nodeId) {
  const start = document.getElementById("startSelect")?.value;
  const end = document.getElementById("endSelect")?.value;
  const routeNodeIds = new Set(routeWasRequested && currentRoute?.nodes ? currentRoute.nodes : []);
  return `${nodeId === start ? " selected-start" : ""}${nodeId === end ? " selected-end" : ""}${routeNodeIds.has(nodeId) ? " on-route" : ""}`;
}

function makeSvg(tag, attributes) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
}

function handleNodePick(nodeId) {
  const startSelect = document.getElementById("startSelect");
  const endSelect = document.getElementById("endSelect");

  if (document.activeElement === startSelect) {
    startSelect.value = nodeId;
  } else if (document.activeElement === endSelect) {
    endSelect.value = nodeId;
  } else if (startSelect.value !== nodeId) {
    endSelect.value = nodeId;
  } else {
    startSelect.value = nodeId;
  }

  clearRouteAndRefresh();
}

function planAndRender() {
  const startId = document.getElementById("startSelect").value;
  const endId = document.getElementById("endSelect").value;
  const preference = document.getElementById("preferenceSelect").value;
  const route = findRoute(startId, endId, preference);
  renderRoute(route);
}

function clearRouteAndRefresh() {
  currentRoute = null;
  routeWasRequested = false;
  drawMap();
  renderIdleSummary();
}

function updateShuttleStatus() {
  const el = document.getElementById("shuttleStatus");
  const now = new Date();
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const isWeekday = day >= 1 && day <= 5;
  const isSaturday = day === 6;
  const open = (isWeekday && minutes >= 7 * 60 && minutes < 19 * 60) || (isSaturday && minutes >= 7 * 60 && minutes < 14 * 60);
  const dayLabel = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day];

  el.innerHTML = open
    ? `<strong>Wheelchair shuttle may be operating</strong> · ${dayLabel}, browser local time. Confirm service before relying on it.`
    : `<strong>Wheelchair shuttle may be closed</strong> · Demo schedule assumes Mon–Fri 7am–7pm and Sat 7am–2pm.`;
}

function bindEvents() {
  document.getElementById("routeForm").addEventListener("submit", (event) => {
    event.preventDefault();
    planAndRender();
  });

  ["startSelect", "endSelect", "preferenceSelect"].forEach((id) => {
    document.getElementById(id).addEventListener("change", clearRouteAndRefresh);
  });

  document.getElementById("swapButton").addEventListener("click", () => {
    const startSelect = document.getElementById("startSelect");
    const endSelect = document.getElementById("endSelect");
    const previousStart = startSelect.value;
    startSelect.value = endSelect.value;
    endSelect.value = previousStart;
    clearRouteAndRefresh();
  });

  document.getElementById("clearRouteButton").addEventListener("click", clearRouteAndRefresh);

  document.querySelectorAll(".preset").forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById("startSelect").value = button.dataset.start;
      document.getElementById("endSelect").value = button.dataset.end;
      clearRouteAndRefresh();
    });
  });
}

function init() {
  populateSelects();
  bindEvents();
  updateShuttleStatus();
  drawMap();
  renderIdleSummary();
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", init);
}

if (typeof module !== "undefined") {
  module.exports = { locations, accessibleEdges, blockedEdges, findRoute, formatMeters, formatMinutes };
}
