// Dados simulados de usuários para autenticação e autorização
const users = [
  { username: 'funcionario1', password: 'senha123', role: 'funcionario' },
  { username: 'gerente1', password: 'senha123', role: 'gerente' },
  { username: 'admin1', password: 'senha123', role: 'admin' }
];

// Função para autenticar o usuário
function authenticate(username, password) {
  return users.find(user => user.username === username && user.password === password);
}

// Função para verificar se o usuário tem permissão para acessar a área restrita
function authorize(role) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
      window.location.href = 'index.html'; // Redireciona para a página de login se não estiver autenticado
      return false;
  }

  if (currentUser.role === role || currentUser.role === 'admin') {
      return true;
  }

  alert('Você não tem permissão para acessar esta área.');
  window.location.href = 'index.html'; // Redireciona se o usuário não tiver permissão
  return false;
}

// Função para fazer login
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  const user = authenticate(username, password);

  if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      window.location.href = 'dashboard.html'; // Redireciona para a página restrita após login bem-sucedido
  } else {
      alert('Usuário ou senha inválidos.');
  }
});

// Função para carregar as informações na página restrita
if (window.location.href.includes('dashboard.html')) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
      document.getElementById('usernameDisplay').textContent = currentUser.username;
  }
  authorize('funcionario'); // Exemplo: permite apenas funcionários, gerentes e administradores de segurança
}

// Função de logout
document.getElementById('logoutButton')?.addEventListener('click', function () {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html'; // Redireciona para a página de login após o logout
});

// Dados simulados de recursos
let resources = {
  equipment: [],
  vehicles: [],
  securityDevices: []
};

// Dados simulados de usuários
const users = [
  { username: 'funcionario1', password: 'senha123', role: 'funcionario' },
  { username: 'gerente1', password: 'senha123', role: 'gerente' },
  { username: 'admin1', password: 'senha123', role: 'admin' }
];

// Função para autenticar o usuário
function authenticate(username, password) {
  return users.find(user => user.username === username && user.password === password);
}

// Função para verificar se o usuário tem permissão para acessar a área restrita
function authorize(role) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
      window.location.href = 'index.html'; // Redireciona para a página de login se não estiver autenticado
      return false;
  }

  if (currentUser.role === role || currentUser.role === 'admin') {
      return true;
  }

  alert('Você não tem permissão para acessar esta área.');
  window.location.href = 'index.html'; // Redireciona se o usuário não tiver permissão
  return false;
}

// Função para carregar as informações do usuário e recursos na página restrita
if (window.location.href.includes('dashboard.html')) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
      document.getElementById('usernameDisplay').textContent = currentUser.username;
      document.getElementById('roleDisplay').textContent = currentUser.role;
  }
  authorize('funcionario'); // Exemplo: permite acesso para funcionários, gerentes e administradores
  loadResources();
}

// Função para exibir os recursos na interface
function loadResources() {
  document.getElementById('equipmentList').innerHTML = resources.equipment.map((item, index) => `
      <li>${item.name} - ${item.description} <button onclick="editResource('equipment', ${index})">Editar</button><button onclick="deleteResource('equipment', ${index})">Excluir</button></li>
  `).join('');

  document.getElementById('vehicleList').innerHTML = resources.vehicles.map((item, index) => `
      <li>${item.name} - ${item.description} <button onclick="editResource('vehicles', ${index})">Editar</button><button onclick="deleteResource('vehicles', ${index})">Excluir</button></li>
  `).join('');

  document.getElementById('deviceList').innerHTML = resources.securityDevices.map((item, index) => `
      <li>${item.name} - ${item.description} <button onclick="editResource('securityDevices', ${index})">Editar</button><button onclick="deleteResource('securityDevices', ${index})">Excluir</button></li>
  `).join('');
}

// Função para adicionar um novo recurso
function addResource(type) {
  const resourceName = document.getElementById('resourceName').value;
  const resourceDescription = document.getElementById('resourceDescription').value;
  if (resourceName && resourceDescription) {
      resources[type].push({ name: resourceName, description: resourceDescription });
      loadResources();
      closeModal();
  } else {
      alert('Por favor, preencha todos os campos.');
  }
}

// Função para editar um recurso existente
function editResource(type, index) {
  document.getElementById('resourceName').value = resources[type][index].name;
  document.getElementById('resourceDescription').value = resources[type][index].description;
  
  document.getElementById('saveResourceBtn').onclick = function() {
      resources[type][index] = {
          name: document.getElementById('resourceName').value,
          description: document.getElementById('resourceDescription').value
      };
      loadResources();
      closeModal();
  };
  
  openModal('Editar Recurso');
}

// Função para excluir um recurso
function deleteResource(type, index) {
  resources[type].splice(index, 1);
  loadResources();
}

// Função para abrir o modal de adicionar/editar
function openModal(title) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modal').style.display = 'flex';
}

// Função para fechar o modal
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// Eventos de botões
document.getElementById('addEquipmentBtn').onclick = function() {
  openModal('Adicionar Equipamento');
  document.getElementById('saveResourceBtn').onclick = function() {
      addResource('equipment');
  };
};

document.getElementById('addVehicleBtn').onclick = function() {
  openModal('Adicionar Veículo');
  document.getElementById('saveResourceBtn').onclick = function() {
      addResource('vehicles');
  };
};

document.getElementById('addDeviceBtn').onclick = function() {
  openModal('Adicionar Dispositivo de Segurança');
  document.getElementById('saveResourceBtn').onclick = function() {
      addResource('securityDevices');
  };
};

document.getElementById('cancelModalBtn').onclick = closeModal;

// Função de logout
document.getElementById('logoutButton')?.addEventListener('click', function () {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html'; // Redireciona para a página de login após o logout
});

// Dados simulados de recursos
let resources = {
  equipment: [],
  vehicles: [],
  securityDevices: []
};

// Dados simulados de usuários
const users = [
  { username: 'funcionario1', password: 'senha123', role: 'funcionario' },
  { username: 'gerente1', password: 'senha123', role: 'gerente' },
  { username: 'admin1', password: 'senha123', role: 'admin' }
];

// Função para autenticar o usuário
function authenticate(username, password) {
  return users.find(user => user.username === username && user.password === password);
}

// Função para verificar se o usuário tem permissão para acessar a área restrita
function authorize(role) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
      window.location.href = 'index.html'; // Redireciona para a página de login se não estiver autenticado
      return false;
  }

  if (currentUser.role === role || currentUser.role === 'admin') {
      return true;
  }

  alert('Você não tem permissão para acessar esta área.');
  window.location.href = 'index.html'; // Redireciona se o usuário não tiver permissão
  return false;
}

// Função para carregar as informações do usuário e recursos na página restrita
if (window.location.href.includes('dashboard.html')) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
      document.getElementById('usernameDisplay').textContent = currentUser.username;
      document.getElementById('roleDisplay').textContent = currentUser.role;
  }
  authorize('funcionario'); // Exemplo: permite acesso para funcionários, gerentes e administradores
  loadResources();
  manageAdminActions(currentUser.role); // Habilitar ações administrativas conforme o papel do usuário
}

// Função para exibir os recursos na interface
function loadResources() {
  document.getElementById('equipmentList').innerHTML = resources.equipment.map((item, index) => `
      <li>${item.name} - ${item.description} 
          <button onclick="editResource('equipment', ${index})">Editar</button>
          <button onclick="deleteResource('equipment', ${index})">Excluir</button>
      </li>
  `).join('');

  document.getElementById('vehicleList').innerHTML = resources.vehicles.map((item, index) => `
      <li>${item.name} - ${item.description} 
          <button onclick="editResource('vehicles', ${index})">Editar</button>
          <button onclick="deleteResource('vehicles', ${index})">Excluir</button>
      </li>
  `).join('');

  document.getElementById('deviceList').innerHTML = resources.securityDevices.map((item, index) => `
      <li>${item.name} - ${item.description} 
          <button onclick="editResource('securityDevices', ${index})">Editar</button>
          <button onclick="deleteResource('securityDevices', ${index})">Excluir</button>
      </li>
  `).join('');
}

// Função para adicionar um novo recurso
function addResource(type) {
  const resourceName = document.getElementById('resourceName').value;
  const resourceDescription = document.getElementById('resourceDescription').value;
  if (resourceName && resourceDescription) {
      resources[type].push({ name: resourceName, description: resourceDescription });
      loadResources();
      closeModal();
  } else {
      alert('Por favor, preencha todos os campos.');
  }
}

// Função para editar um recurso existente
function editResource(type, index) {
  document.getElementById('resourceName').value = resources[type][index].name;
  document.getElementById('resourceDescription').value = resources[type][index].description;
  
  document.getElementById('saveResourceBtn').onclick = function() {
      resources[type][index] = {
          name: document.getElementById('resourceName').value,
          description: document.getElementById('resourceDescription').value
      };
      loadResources();
      closeModal();
  };
  
  openModal('Editar Recurso');
}

// Função para excluir um recurso
function deleteResource(type, index) {
  if (confirm('Tem certeza que deseja excluir este recurso?')) {
      resources[type].splice(index, 1);
      loadResources();
  }
}

// Função para abrir o modal de adicionar/editar
function openModal(title) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modal').style.display = 'flex';
}

// Função para fechar o modal
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// Função para habilitar as ações administrativas (se o usuário for admin)
function manageAdminActions(role) {
  if (role !== 'admin') {
      const adminButtons = document.querySelectorAll('.admin-action');
      adminButtons.forEach(button => button.style.display = 'none'); // Esconde botões administrativos para não admins
  }
}

// Eventos de botões
document.getElementById('addEquipmentBtn').onclick = function() {
  openModal('Adicionar Equipamento');
  document.getElementById('saveResourceBtn').onclick = function() {
      addResource('equipment');
  };
};

document.getElementById('addVehicleBtn').onclick = function() {
  openModal('Adicionar Veículo');
  document.getElementById('saveResourceBtn').onclick = function() {
      addResource('vehicles');
  };
};

document.getElementById('addDeviceBtn').onclick = function() {
  openModal('Adicionar Dispositivo de Segurança');
  document.getElementById('saveResourceBtn').onclick = function() {
      addResource('securityDevices');
  };
};

document.getElementById('cancelModalBtn').onclick = closeModal;

// Função de logout
document.getElementById('logoutButton')?.addEventListener('click', function () {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html'; // Redireciona para a página de login após o logout
});

// Dados simulados
const securityData = {
  incidentsToday: 5,
  activeAlerts: 2,
  devicesWorking: 3,
};

const resourcesData = {
  equipment: 30,
  vehicles: 10,
  securityDevices: 5,
};

// Atividades Recentes: exemplo de entrada de funcionários
const activitiesData = [
  { time: '08:00', event: 'Entrada - Funcionário A' },
  { time: '09:15', event: 'Entrada - Funcionário B' },
  { time: '10:30', event: 'Saída - Funcionário C' },
  { time: '11:00', event: 'Entrada - Funcionário D' },
  { time: '14:00', event: 'Entrada - Funcionário E' },
];

// Dados para o gráfico de incidentes de segurança
const securityIncidents = [5, 3, 4, 2, 7, 6, 3]; // Incidentes por dia da semana
const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

// Carregar dados na interface
function loadDashboardData() {
  document.getElementById('securityIncidents').textContent = securityData.incidentsToday;
  document.getElementById('activeAlerts').textContent = securityData.activeAlerts;
  document.getElementById('securityDevices').textContent = securityData.devicesWorking;

  document.getElementById('equipmentCount').textContent = resourcesData.equipment;
  document.getElementById('vehicleCount').textContent = resourcesData.vehicles;
  document.getElementById('devicesCount').textContent = resourcesData.securityDevices;

  // Mostrar atividades recentes no console (aqui você pode exibir em uma lista)
  console.log(activitiesData);
}

// Gráfico de Atividades Recentes (gráfico de barras com Chart.js)
function loadActivityChart() {
  const ctx = document.getElementById('activityChart').getContext('2d');
  new Chart(ctx, {
      type: 'bar',
      data: {
          labels: activitiesData.map(a => a.time),
          datasets: [{
              label: 'Entradas e Saídas',
              data: activitiesData.map(a => a.event.includes('Entrada') ? 1 : -1), // Representa entradas (+1) e saídas (-1)
              backgroundColor: 'rgba(52, 152, 219, 0.6)',
              borderColor: 'rgba(52, 152, 219, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      stepSize: 1
                  }
              }
          }
      });
}

// Gráfico de Incidentes de Segurança (gráfico de linha com Chart.js)
function loadSecurityChart() {
  const ctx = document.getElementById('securityChart').getContext('2d');
  new Chart(ctx, {
      type: 'line',
      data: {
          labels: daysOfWeek,
          datasets: [{
              label: 'Incidentes de Segurança (Últimos 7 Dias)',
              data: securityIncidents,
              fill: false,
              borderColor: 'rgba(231, 76, 60, 1)',
              tension: 0.1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      });
}

// Função de logout
document.getElementById('logoutButton').addEventListener('click', function () {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html'; // Redireciona para a página de login após o logout
});

// Função de inicialização
function initDashboard() {
  loadDashboardData();
  loadActivityChart();
  loadSecurityChart();
}

// Chama a função para inicializar o painel quando a página carregar
window.onload = initDashboard;

// Dados simulados
const securityData = {
  incidentsDetected: 3,
  activeAlerts: 1,
  devicesWorking: 4,
};

const resourcesData = {
  activeProjects: 7,
  techEquipment: 25,
  batVehicles: 2,
};

// Atividades Recentes: simulação de eventos
const activitiesData = [
  { time: '08:00', event: 'Detecção de atividade criminosa' },
  { time: '09:00', event: 'Monitoramento de vigilância ativado' },
  { time: '10:30', event: 'Análise de imagem - Batcaverna' },
  { time: '12:00', event: 'Ação em andamento - Veículo A' },
];

// Dados para o gráfico de incidentes
const securityIncidents = [2, 3, 1, 4, 5, 2, 3]; // Incidentes por dia
const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

// Carregar os dados no painel
function loadDashboardData() {
  document.getElementById('securityIncidents').textContent = securityData.incidentsDetected;
  document.getElementById('activeAlerts').textContent = securityData.activeAlerts;
  document.getElementById('securityDevices').textContent = securityData.devicesWorking;

  document.getElementById('activeProjects').textContent = resourcesData.activeProjects;
  document.getElementById('techEquipment').textContent = resourcesData.techEquipment;
  document.getElementById('batVehicles').textContent = resourcesData.batVehicles;

  console.log(activitiesData); // Exibir atividades no console (ou você pode criar uma lista no HTML)
}

// Gráfico de Atividades Recentes
function loadActivityChart() {
  const ctx = document.getElementById('activityChart').getContext('2d');
  new Chart(ctx, {
      type: 'bar',
      data: {
          labels: activitiesData.map(a => a.time),
          datasets: [{
              label: 'Atividades Criminosas',
              data: activitiesData.map(a => a.event.includes('detecção') ? 1 : 0), 
              backgroundColor: 'rgba(52, 152, 219, 0.6)',
              borderColor: 'rgba(52, 152, 219, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      stepSize: 1
                  }
              }
          }
      });
}

// Gráfico de Incidentes de Segurança
function loadSecurityChart() {
  const ctx = document.getElementById('securityChart').getContext('2d');
  new Chart(ctx, {
      type: 'line',
      data: {
          labels: daysOfWeek,
          datasets: [{
              label: 'Incidentes de Segurança (Últimos 7 Dias)',
              data: securityIncidents,
              fill: false,
              borderColor: 'rgba(231, 76, 60, 1)',
              tension: 0.1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      });
}

// Função de logout
document.getElementById('logoutButton').addEventListener('click', function () {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html'; // Redireciona para login após logout
});

// Inicializar o painel
function initDashboard() {
  loadDashboardData();
  loadActivityChart();
  loadSecurityChart();
}

// Executar na inicialização da página
window.onload = initDashboard;

// Dados simulados
const securityData = {
  incidentsDetected: 3,
  activeAlerts: 1,
  devicesWorking: 4,
};

const resourcesData = {
  activeProjects: 7,
  techEquipment: 25,
  batVehicles: 2,
};

// Atividades Recentes: simulação de eventos
const activitiesData = [
  { time: '08:00', event: 'Detecção de atividade criminosa' },
  { time: '09:00', event: 'Monitoramento de vigilância ativado' },
  { time: '10:30', event: 'Análise de imagem - Batcaverna' },
  { time: '12:00', event: 'Ação em andamento - Veículo A' },
];

// Dados para o gráfico de incidentes
const securityIncidents = [2, 3, 1, 4, 5, 2, 3]; // Incidentes por dia
const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

// Carregar os dados no painel
function loadDashboardData() {
  document.getElementById('securityIncidents').textContent = securityData.incidentsDetected;
  document.getElementById('activeAlerts').textContent = securityData.activeAlerts;
  document.getElementById('securityDevices').textContent = securityData.devicesWorking;

  document.getElementById('activeProjects').textContent = resourcesData.activeProjects;
  document.getElementById('techEquipment').textContent = resourcesData.techEquipment;
  document.getElementById('batVehicles').textContent = resourcesData.batVehicles;

  console.log(activitiesData); // Exibir atividades no console (ou você pode criar uma lista no HTML)
}

// Gráfico de Atividades Recentes
function loadActivityChart() {
  const ctx = document.getElementById('activityChart').getContext('2d');
  new Chart(ctx, {
      type: 'bar',
      data: {
          labels: activitiesData.map(a => a.time),
          datasets: [{
              label: 'Atividades Criminosas',
              data: activitiesData.map(a => a.event.includes('detecção') ? 1 : 0), 
              backgroundColor: 'rgba(52, 152, 219, 0.6)',
              borderColor: 'rgba(52, 152, 219, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      stepSize: 1
                  }
              }
          }
      });
}

// Gráfico de Incidentes de Segurança
function loadSecurityChart() {
  const ctx = document.getElementById('securityChart').getContext('2d');
  new Chart(ctx, {
      type: 'line',
      data: {
          labels: daysOfWeek,
          datasets: [{
              label: 'Incidentes de Segurança (Últimos 7 Dias)',
              data: securityIncidents,
              fill: false,
              borderColor: 'rgba(231, 76, 60, 1)',
              tension: 0.1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      });
}

// Função de logout
document.getElementById('logoutButton').addEventListener('click', function () {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html'; // Redireciona para login após logout
});

// Inicializar o painel
function initDashboard() {
  loadDashboardData();
  loadActivityChart();
  loadSecurityChart();
}

// Executar na inicialização da página
window.onload = initDashboard;
