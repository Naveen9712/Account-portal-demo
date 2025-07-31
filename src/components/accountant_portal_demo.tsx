import { useState } from 'react';
import { Users, FileText, Brain, Upload, Plus, CheckCircle, XCircle, MessageSquare, Eye, Menu, Home, ChevronRight, ChevronLeft, X, CloudUpload, User, MapPin, Building, DollarSign, FileCheck, AlertCircle, Mail, Calendar, Download, AlertTriangle, Edit } from 'lucide-react';

// TypeScript Interfaces
interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  lastUpdated: string;
  clientType: string;
  filingStatus: string;
  taxYear: string;
  priority: string;
  assignedPreparer: string;
  dueDate: string;
  clientSince: string;
  lastContact: string;
  serviceType: string;
  estimatedFee: string;
  complianceIssues: boolean;
}

interface Task {
  id: string;
  description: string;
  confidence: number;
  irsCode: string;
  client: string;
  category: string;
  status?: string;
}

interface ClientData {
  name: string;
  email: string;
  phone: string;
  maritalStatus?: string;
  dependents?: number;
  hasForeiginAccounts?: boolean;
  employmentStatus?: string;
}

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

interface LoginPageProps {
  onLogin: () => void;
}

interface DashboardProps {
  clients: Client[];
  tasks: Task[];
}

interface ClientListProps {
  clients: Client[];
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  onAddClient: (clientData: ClientData) => void;
}

interface AITaskCenterProps {
  tasks: Task[];
  onTaskAction: (taskId: string, action: string) => void;
}

interface UploadDemoProps {
  uploadProgress: number;
  isUploading: boolean;
  onUpload: () => void;
}

interface AddClientModalProps {
  onClose: () => void;
  onAdd: (clientData: ClientData) => void;
}

interface Dependent {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  ssn: string;
  relationship: string;
  liveWithTaxpayer: boolean;
}

interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  ssn: string;
  email: string;
  phone: string;
  alternatePhone: string;
  citizenshipStatus: string;
  visaType: string;
  firstYearInUS: string;
  maritalStatus: string;
  dependents: Dependent[];
  hasForeiginAccounts: boolean;
  employmentStatus: string;
  employerName: string;
  employerAddress: string;
  employerPhone: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  annualSalary: string;
  otherIncome: string;
  interestIncome: string;
  dividendIncome: string;
  rentalIncome: string;
  businessIncome: string;
  capitalGains: string;
  otherIncomeSources: string;
  specialCircumstances: string;
  // Additional properties that are used in the form
  taxResidencyStatus: string;
  spouseFirstName: string;
  spouseLastName: string;
  spouseSSN: string;
  spouseDOB: string;
  currentAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  previousAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    dateMovedFrom: string;
  };
  homeOwnership: string;
  foreignAccountsValue: string;
  bankAccounts: any[];
  employer: string;
  selfEmployed: boolean;
  filedLastYear: string;
  priorYearAGI: string;
  hasOutstandingIssues: boolean;
  needsAmendedReturn: boolean;
  hasHealthInsurance: string;
  hasRetirementAccounts: boolean;
  hasInvestmentIncome: boolean;
  hasRentalProperty: boolean;
  hasCharitableContributions: boolean;
}

interface ExtractedData {
  firstName: string;
  lastName: string;
  client: string;
  taxYear: string;
  income: string;
  deductions: Array<{
    type: string;
    amount: string;
    confidence: string;
  }>;
  suggestedOptimizations: string[];
  dateOfBirth: string;
  ssn: string;
  email: string;
  phone: string;
  maritalStatus: string;
  spouseFirstName: string;
  spouseLastName: string;
  currentAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  employmentStatus: string;
  employer: string;
}

// Dummy Data
const dummyClients = [
  { 
    id: 1, 
    name: "John Smith", 
    email: "john@email.com", 
    phone: "(555) 123-4567",
    status: "AI Processing", 
    lastUpdated: "2025-07-29",
    clientType: "Individual",
    filingStatus: "Married Filing Jointly",
    taxYear: "2024",
    priority: "Medium",
    assignedPreparer: "Sarah Martinez",
    dueDate: "2025-04-15",
    clientSince: "2019",
    lastContact: "2025-07-25",
    serviceType: "Tax Preparation",
    estimatedFee: "$450",
    complianceIssues: false
  },
  { 
    id: 2, 
    name: "Sarah Johnson", 
    email: "sarah@email.com", 
    phone: "(555) 234-5678",
    status: "Awaiting Upload", 
    lastUpdated: "2025-07-28",
    clientType: "Individual",
    filingStatus: "Head of Household",
    taxYear: "2024",
    priority: "High",
    assignedPreparer: "Michael Chen",
    dueDate: "2025-04-15",
    clientSince: "2021",
    lastContact: "2025-07-20",
    serviceType: "Tax Prep + Planning",
    estimatedFee: "$650",
    complianceIssues: false
  },
  { 
    id: 3, 
    name: "Mike Davis", 
    email: "mike@email.com", 
    phone: "(555) 345-6789",
    status: "Incomplete", 
    lastUpdated: "2025-07-27",
    clientType: "Individual",
    filingStatus: "Single",
    taxYear: "2024",
    priority: "Low",
    assignedPreparer: "Sarah Martinez",
    dueDate: "2025-04-15",
    clientSince: "2023",
    lastContact: "2025-07-15",
    serviceType: "Tax Preparation",
    estimatedFee: "$325",
    complianceIssues: false
  },
  { 
    id: 4, 
    name: "Lisa Chen", 
    email: "lisa@email.com", 
    phone: "(555) 456-7890",
    status: "AI Processing", 
    lastUpdated: "2025-07-30",
    clientType: "Individual",
    filingStatus: "Married Filing Separately",
    taxYear: "2024",
    priority: "Medium",
    assignedPreparer: "David Wilson",
    dueDate: "2025-04-15",
    clientSince: "2020",
    lastContact: "2025-07-28",
    serviceType: "Tax Preparation",
    estimatedFee: "$425",
    complianceIssues: false
  },
  { 
    id: 5, 
    name: "Robert Wilson", 
    email: "robert@email.com", 
    phone: "(555) 567-8901",
    status: "Awaiting Upload", 
    lastUpdated: "2025-07-26",
    clientType: "Business",
    filingStatus: "S-Corporation",
    taxYear: "2024",
    priority: "High",
    assignedPreparer: "Michael Chen",
    dueDate: "2025-03-15",
    clientSince: "2018",
    lastContact: "2025-07-22",
    serviceType: "Business Tax + Payroll",
    estimatedFee: "$2,400",
    complianceIssues: false
  },
  { 
    id: 6, 
    name: "Tech Innovations LLC", 
    email: "finance@techinnovations.com", 
    phone: "(555) 678-9012",
    status: "Under Review", 
    lastUpdated: "2025-07-31",
    clientType: "Business",
    filingStatus: "LLC",
    taxYear: "2024",
    priority: "High",
    assignedPreparer: "David Wilson",
    dueDate: "2025-03-15",
    clientSince: "2022",
    lastContact: "2025-07-30",
    serviceType: "Business Tax + Consulting",
    estimatedFee: "$3,200",
    complianceIssues: false
  },
  { 
    id: 7, 
    name: "Maria Rodriguez", 
    email: "maria.rodriguez@email.com", 
    phone: "(555) 789-0123",
    status: "Complete", 
    lastUpdated: "2025-07-24",
    clientType: "Individual",
    filingStatus: "Married Filing Jointly",
    taxYear: "2024",
    priority: "Low",
    assignedPreparer: "Sarah Martinez",
    dueDate: "2025-04-15",
    clientSince: "2021",
    lastContact: "2025-07-24",
    serviceType: "Tax Preparation",
    estimatedFee: "$385",
    complianceIssues: false
  },
  { 
    id: 8, 
    name: "Green Valley Non-Profit", 
    email: "admin@greenvalley.org", 
    phone: "(555) 890-1234",
    status: "AI Processing", 
    lastUpdated: "2025-07-29",
    clientType: "Non-Profit",
    filingStatus: "501(c)(3)",
    taxYear: "2024",
    priority: "Medium",
    assignedPreparer: "Michael Chen",
    dueDate: "2025-05-15",
    clientSince: "2019",
    lastContact: "2025-07-26",
    serviceType: "Non-Profit Tax Filing",
    estimatedFee: "$850",
    complianceIssues: false
  },
  { 
    id: 9, 
    name: "James Thompson", 
    email: "j.thompson@email.com", 
    phone: "(555) 901-2345",
    status: "Needs Attention", 
    lastUpdated: "2025-07-18",
    clientType: "Individual",
    filingStatus: "Single",
    taxYear: "2024",
    priority: "High",
    assignedPreparer: "David Wilson",
    dueDate: "2025-04-15",
    clientSince: "2017",
    lastContact: "2025-07-10",
    serviceType: "Tax Prep + Audit Support",
    estimatedFee: "$1,200",
    complianceIssues: true
  },
  { 
    id: 10, 
    name: "Sunset Restaurants Inc", 
    email: "accounting@sunsetrest.com", 
    phone: "(555) 012-3456",
    status: "In Progress", 
    lastUpdated: "2025-07-30",
    clientType: "Business",
    filingStatus: "C-Corporation",
    taxYear: "2024",
    priority: "Medium",
    assignedPreparer: "Sarah Martinez",
    dueDate: "2025-03-15",
    clientSince: "2020",
    lastContact: "2025-07-29",
    serviceType: "Corporate Tax",
    estimatedFee: "$1,800",
    complianceIssues: false
  },
  { 
    id: 11, 
    name: "Amanda Foster", 
    email: "amanda.foster@email.com", 
    phone: "(555) 123-4567",
    status: "Awaiting Upload", 
    lastUpdated: "2025-07-25",
    clientType: "Individual",
    filingStatus: "Qualifying Widow",
    taxYear: "2024",
    priority: "Medium",
    assignedPreparer: "Michael Chen",
    dueDate: "2025-04-15",
    clientSince: "2024",
    lastContact: "2025-07-23",
    serviceType: "Tax Preparation",
    estimatedFee: "$475",
    complianceIssues: false
  },
  { 
    id: 12, 
    name: "Creative Solutions Partnership", 
    email: "partners@creativesol.com", 
    phone: "(555) 234-5678",
    status: "Under Review", 
    lastUpdated: "2025-07-28",
    clientType: "Business",
    filingStatus: "Partnership",
    taxYear: "2024",
    priority: "High",
    assignedPreparer: "David Wilson",
    dueDate: "2025-03-15",
    clientSince: "2021",
    lastContact: "2025-07-27",
    serviceType: "Partnership Tax + K-1s",
    estimatedFee: "$2,100",
    complianceIssues: false
  }
];

const dummyTasks = [
  {
    id: "T001",
    description: "Consider Student Loan Interest Deduction for John Smith",
    confidence: 89,
    irsCode: "§221",
    client: "John Smith",
    category: "Education"
  },
  {
    id: "T002", 
    description: "Home Office Deduction Opportunity for Sarah Johnson",
    confidence: 76,
    irsCode: "§280A",
    client: "Sarah Johnson",
    category: "Business"
  },
  {
    id: "T003",
    description: "Medical Expense Deduction Analysis for Mike Davis",
    confidence: 65,
    irsCode: "§213",
    client: "Mike Davis",
    category: "Medical"
  },
  {
    id: "T004",
    description: "Charitable Contribution Optimization for Lisa Chen",
    confidence: 92,
    irsCode: "§170",
    client: "Lisa Chen",
    category: "Charitable"
  },
  {
    id: "T005",
    description: "Business Vehicle Expense Review for Robert Wilson",
    confidence: 71,
    irsCode: "§162",
    client: "Robert Wilson",
    category: "Business"
  },
  {
    id: "T006",
    description: "Mortgage Interest Deduction Optimization for John Smith",
    confidence: 88,
    irsCode: "§163",
    client: "John Smith",
    category: "Housing"
  },
  {
    id: "T007",
    description: "Child Tax Credit Eligibility Review for Sarah Johnson",
    confidence: 95,
    irsCode: "§24",
    client: "Sarah Johnson",
    category: "Family"
  },
  {
    id: "T008",
    description: "State Tax Deduction vs. Sales Tax for Mike Davis",
    confidence: 73,
    irsCode: "§164",
    client: "Mike Davis",
    category: "Taxes"
  },
  {
    id: "T009",
    description: "IRA Contribution Deduction for Lisa Chen",
    confidence: 81,
    irsCode: "§219",
    client: "Lisa Chen",
    category: "Retirement"
  },
  {
    id: "T010",
    description: "Education Credits Analysis for Robert Wilson",
    confidence: 78,
    irsCode: "§25A",
    client: "Robert Wilson",
    category: "Education"
  },
  {
    id: "T011",
    description: "Self-Employment Tax Deduction for John Smith",
    confidence: 84,
    irsCode: "§164",
    client: "John Smith",
    category: "Business"
  },
  {
    id: "T012",
    description: "Dependent Care Credit Opportunity for Sarah Johnson",
    confidence: 87,
    irsCode: "§21",
    client: "Sarah Johnson",
    category: "Family"
  },
  {
    id: "T013",
    description: "Health Savings Account Deduction for Mike Davis",
    confidence: 90,
    irsCode: "§223",
    client: "Mike Davis",
    category: "Medical"
  },
  {
    id: "T014",
    description: "Energy Efficiency Credit Review for Lisa Chen",
    confidence: 69,
    irsCode: "§25C",
    client: "Lisa Chen",
    category: "Energy"
  },
  {
    id: "T015",
    description: "Business Meal Deduction Analysis for Robert Wilson",
    confidence: 75,
    irsCode: "§274",
    client: "Robert Wilson",
    category: "Business"
  }
];

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [clients, setClients] = useState(dummyClients);
  const [tasks, setTasks] = useState(dummyTasks);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleAddClient = (clientData: ClientData) => {
    const newClient: Client = {
      id: clients.length + 1,
      name: clientData.name,
      email: clientData.email,
      phone: clientData.phone,
      status: "Incomplete",
      lastUpdated: new Date().toISOString().split('T')[0],
      clientType: "Individual",
      filingStatus: clientData.maritalStatus || "Single",
      taxYear: "2024",
      priority: "Medium",
      assignedPreparer: "Sarah Martinez",
      dueDate: "2025-04-15",
      clientSince: new Date().getFullYear().toString(),
      lastContact: new Date().toISOString().split('T')[0],
      serviceType: "Tax Preparation",
      estimatedFee: "$400",
      complianceIssues: false
    };
    setClients([...clients, newClient]);
    setShowAddClientModal(false);
  };

  const handleTaskAction = (taskId: string, action: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: action }
        : task
    ));
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <TopBar />
        <main className="p-6">
          {currentPage === 'dashboard' && <Dashboard clients={clients} tasks={tasks} />}
          {currentPage === 'clients' && (
            <ClientList 
              clients={clients}
              showModal={showAddClientModal}
              setShowModal={setShowAddClientModal}
              onAddClient={handleAddClient}
            />
          )}
          {currentPage === 'tasks' && <AITaskCenter tasks={tasks} onTaskAction={handleTaskAction} />}
          {currentPage === 'upload' && (
            <UploadDemo 
              uploadProgress={uploadProgress}
              isUploading={isUploading}
              onUpload={simulateUpload}
            />
          )}
        </main>
      </div>
    </div>
  );
};

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Tax AI Portal</h2>
          <p className="mt-2 text-gray-600">Sign in to your accountant dashboard</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="accountant@firm.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>
            
            <button
              onClick={onLogin}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            Demo: Use any email/password to login
          </div>
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ currentPage, setCurrentPage, collapsed, setCollapsed }: SidebarProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'tasks', label: 'AI Tasks', icon: Brain },
    { id: 'upload', label: 'Deduction Agent', icon: Upload }
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-10 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <h1 className="text-xl font-semibold text-gray-900">Tax AI Portal</h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
      
      <nav className="mt-6">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                currentPage === item.id
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              } ${collapsed ? 'justify-center' : 'justify-start'}`}
              title={collapsed ? item.label : ''}
            >
              <Icon className={`w-5 h-5 ${collapsed ? '' : 'mr-3'}`} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>
      
      {/* Add Client Button */}
      <div className="absolute bottom-6 left-0 right-0 px-4">
        <AddClientButton collapsed={collapsed} />
      </div>
    </div>
  );
};

const AddClientButton = ({ collapsed }: { collapsed: boolean }) => {
  const [showModal, setShowModal] = useState(false);
  const [clients, setClients] = useState(dummyClients);

  const handleAddClient = (clientData: ClientData) => {
    const newClient: Client = {
      id: clients.length + 1,
      name: clientData.name,
      email: clientData.email,
      phone: clientData.phone,
      status: "Incomplete",
      lastUpdated: new Date().toISOString().split('T')[0],
      clientType: "Individual",
      filingStatus: clientData.maritalStatus || "Single",
      taxYear: "2024",
      priority: "Medium",
      assignedPreparer: "Sarah Martinez",
      dueDate: "2025-04-15",
      clientSince: new Date().getFullYear().toString(),
      lastContact: new Date().toISOString().split('T')[0],
      serviceType: "Tax Preparation",
      estimatedFee: "$400",
      complianceIssues: false
    };
    setClients([...clients, newClient]);
    setShowModal(false);
    // You might want to trigger a global state update here
    window.location.reload(); // Simple refresh for demo purposes
  };

  if (collapsed) {
    return (
      <>
        <button
          onClick={() => setShowModal(true)}
          className="w-full flex items-center justify-center p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          title="Add Client"
        >
          <Plus className="w-5 h-5" />
        </button>
        {showModal && <AddClientModal onClose={() => setShowModal(false)} onAdd={handleAddClient} />}
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        <Plus className="w-5 h-5 mr-2" />
        <span className="font-medium">Add Client</span>
      </button>
      {showModal && <AddClientModal onClose={() => setShowModal(false)} onAdd={handleAddClient} />}
    </>
  );
};

const TopBar = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-lg font-medium text-gray-900">Welcome back, Sarah!</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ clients, tasks }: DashboardProps) => {
  const stats = {
    totalClients: clients.length,
    pendingTasks: tasks.filter(task => !task.status).length,
    aiSuggestionsToday: tasks.filter(task => task.confidence > 80).length,
    highPriorityClients: clients.filter(client => client.priority === 'High').length,
    complianceIssues: clients.filter(client => client.complianceIssues).length,
    completedReturns: clients.filter(client => client.status === 'Complete').length
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Here's what's happening with your clients today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Clients</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalClients}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingTasks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <Brain className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">AI Suggestions Today</p>
              <p className="text-2xl font-bold text-gray-900">{stats.aiSuggestionsToday}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-gray-900">{stats.highPriorityClients}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <AlertCircle className="w-8 h-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Compliance Issues</p>
              <p className="text-2xl font-bold text-gray-900">{stats.complianceIssues}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed Returns</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedReturns}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Client Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {clients.slice(0, 4).map(client => (
                <div key={client.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{client.name}</p>
                      <p className="text-sm text-gray-500">{client.serviceType}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      client.status === 'AI Processing' ? 'bg-blue-100 text-blue-800' :
                      client.status === 'Awaiting Upload' ? 'bg-yellow-100 text-yellow-800' :
                      client.status === 'Complete' ? 'bg-green-100 text-green-800' :
                      client.status === 'Needs Attention' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {client.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{client.estimatedFee}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">High Priority Tasks</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {tasks.filter(task => task.confidence > 80).slice(0, 4).map(task => (
                <div key={task.id} className="border-l-4 border-green-400 pl-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{task.description}</p>
                      <p className="text-sm text-gray-500">
                        {task.client} • {task.confidence}% confidence • {task.irsCode}
                      </p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {task.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClientList = ({ clients, showModal, setShowModal, onAddClient }: ClientListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [clientTypeFilter, setClientTypeFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const clientsPerPage = 8;

  // Get unique values for filters
  const uniqueStatuses = [...new Set(clients.map(client => client.status))].sort();
  const uniqueClientTypes = [...new Set(clients.map(client => client.clientType))].sort();
  const uniquePriorities = [...new Set(clients.map(client => client.priority))].sort();

  // Filter and sort clients
  const filteredClients = clients.filter(client => {
    return (!statusFilter || client.status === statusFilter) &&
           (!clientTypeFilter || client.clientType === clientTypeFilter) &&
           (!priorityFilter || client.priority === priorityFilter);
  });

  const sortedClients = [...filteredClients].sort((a, b) => {
    const aValue = a[sortField as keyof Client];
    const bValue = b[sortField as keyof Client];
    const direction = sortDirection === 'asc' ? 1 : -1;
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * direction;
    }
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return (aValue - bValue) * direction;
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedClients.length / clientsPerPage);
  const startIndex = (currentPage - 1) * clientsPerPage;
  const paginatedClients = sortedClients.slice(startIndex, startIndex + clientsPerPage);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const resetFilters = () => {
    setStatusFilter('');
    setClientTypeFilter('');
    setPriorityFilter('');
    setCurrentPage(1);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'AI Processing': 'bg-blue-100 text-blue-800',
      'Awaiting Upload': 'bg-yellow-100 text-yellow-800',
      'Incomplete': 'bg-gray-100 text-gray-800',
      'Under Review': 'bg-purple-100 text-purple-800',
      'Complete': 'bg-green-100 text-green-800',
      'Needs Attention': 'bg-red-100 text-red-800',
      'In Progress': 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'High': 'text-red-600',
      'Medium': 'text-yellow-600',
      'Low': 'text-green-600'
    };
    return colors[priority] || 'text-gray-600';
  };

  const handleClientAction = (action: string, client: Client) => {
    console.log(`${action} action for client:`, client.name);
    // In a real app, these would make API calls
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client</span>
        </button>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Statuses</option>
              {uniqueStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Client Type</label>
            <select
              value={clientTypeFilter}
              onChange={(e) => setClientTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Types</option>
              {uniqueClientTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Priorities</option>
              {uniquePriorities.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>Showing {startIndex + 1}-{Math.min(startIndex + clientsPerPage, sortedClients.length)} of {sortedClients.length} clients</span>
          <span>{filteredClients.length !== clients.length && `(${clients.length} total)`}</span>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Client</span>
                    {sortField === 'name' && (
                      <span className="text-blue-600">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type & Status
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('priority')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Priority</span>
                    {sortField === 'priority' && (
                      <span className="text-blue-600">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('dueDate')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Due Date</span>
                    {sortField === 'dueDate' && (
                      <span className="text-blue-600">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedClients.map(client => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <User className="h-6 w-6 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          {client.name}
                          {client.complianceIssues && (
                            <AlertTriangle className="ml-2 h-4 w-4 text-red-500" />
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{client.email}</div>
                        <div className="text-sm text-gray-500">{client.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{client.clientType}</div>
                    <div className="text-sm text-gray-500">{client.filingStatus}</div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(client.status)}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getPriorityColor(client.priority)}`}>
                      {client.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {client.assignedPreparer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{client.dueDate}</div>
                    <div className="text-xs text-gray-500">Tax Year {client.taxYear}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="font-medium">{client.estimatedFee}</div>
                    <div className="text-xs text-gray-500">{client.serviceType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleClientAction('view', client)}
                        className="text-blue-600 hover:text-blue-800"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleClientAction('edit', client)}
                        className="text-gray-600 hover:text-gray-800"
                        title="Edit Client"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleClientAction('email', client)}
                        className="text-green-600 hover:text-green-800"
                        title="Send Email"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleClientAction('schedule', client)}
                        className="text-purple-600 hover:text-purple-800"
                        title="Schedule Meeting"
                      >
                        <Calendar className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleClientAction('download', client)}
                        className="text-indigo-600 hover:text-indigo-800"
                        title="Download Documents"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              {totalPages > 5 && (
                <span className="px-2 text-gray-500">...</span>
              )}
            </div>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
          
          <div className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}

      {showModal && <AddClientModal onClose={() => setShowModal(false)} onAdd={onAddClient} />}
    </div>
  );
};

const AddClientModal = ({ onClose, onAdd }: AddClientModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [intakeMethod, setIntakeMethod] = useState(''); // 'upload' or 'manual'
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    // Personal Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    ssn: '',
    email: '',
    phone: '',
    alternatePhone: '',
    
    // Immigration & Tax Status
    citizenshipStatus: '',
    visaType: '',
    firstYearInUS: '',
    taxResidencyStatus: '',
    
    // Marital Status & Spouse Info
    maritalStatus: '',
    spouseFirstName: '',
    spouseLastName: '',
    spouseSSN: '',
    spouseDOB: '',
    
    // Dependents
    dependents: [],
    
    // Address Information
    currentAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },
    previousAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      dateMovedFrom: ''
    },
    homeOwnership: '',
    
    // Financial Information
    hasForeiginAccounts: false,
    foreignAccountsValue: '',
    bankAccounts: [],
    employmentStatus: '',
    employer: '',
    selfEmployed: false,
    
    // Previous Tax Information
    filedLastYear: '',
    priorYearAGI: '',
    hasOutstandingIssues: false,
    needsAmendedReturn: false,
    
    // Additional Information
    hasHealthInsurance: '',
    hasRetirementAccounts: false,
    hasInvestmentIncome: false,
    hasRentalProperty: false,
    hasCharitableContributions: false,
    specialCircumstances: '',
    
    // Employment Information
    employerName: '',
    employerAddress: '',
    employerPhone: '',
    jobTitle: '',
    startDate: '',
    endDate: '',
    annualSalary: '',
    otherIncome: '',
    interestIncome: '',
    dividendIncome: '',
    rentalIncome: '',
    businessIncome: '',
    capitalGains: '',
    otherIncomeSources: ''
  });

  const steps = [
    { title: 'Getting Started', icon: CloudUpload },
    { title: 'Personal Info', icon: User },
    { title: 'Family Details', icon: Users },
    { title: 'Address & Residency', icon: MapPin },
    { title: 'Financial Accounts', icon: Building },
    { title: 'Income & Employment', icon: DollarSign },
    { title: 'Tax History', icon: FileCheck },
    { title: 'Review & Submit', icon: CheckCircle }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const processUploadedFiles = () => {
    setIsProcessing(true);
    
    // Simulate AI processing of uploaded documents
    setTimeout(() => {
      setExtractedData({
        firstName: 'John',
        lastName: 'Smith',
        client: 'John Smith',
        taxYear: '2024',
        income: '$75,000',
        deductions: [
          { type: 'Standard Deduction', amount: '$12,950', confidence: '95%' },
          { type: 'Student Loan Interest', amount: '$2,500', confidence: '89%' }
        ],
        suggestedOptimizations: ['Consider HSA contributions', 'Maximize 401(k) contributions'],
        dateOfBirth: '1985-03-15',
        ssn: '123-45-6789',
        email: 'john.smith@email.com',
        phone: '(555) 123-4567',
        maritalStatus: 'married',
        spouseFirstName: 'Jane',
        spouseLastName: 'Smith',
        currentAddress: {
          street: '123 Main St',
          city: 'Austin',
          state: 'TX',
          zipCode: '78701',
          country: 'United States'
        },
        employmentStatus: 'employed',
        employer: 'Tech Corp Inc'
      });
      
      setFormData(prev => ({
        ...prev,
        firstName: 'John',
        lastName: 'Smith',
        dateOfBirth: '1985-03-15',
        ssn: '123-45-6789',
        email: 'john.smith@email.com',
        phone: '(555) 123-4567',
        maritalStatus: 'married',
        spouseFirstName: 'Jane',
        spouseLastName: 'Smith',
        currentAddress: {
          street: '123 Main St',
          city: 'Austin',
          state: 'TX',
          zipCode: '78701',
          country: 'United States'
        },
        employmentStatus: 'employed',
        employer: 'Tech Corp Inc'
      }));
      
      setIsProcessing(false);
      setCurrentStep(1); // Move to personal info step
    }, 3000);
  };

  const addDependent = () => {
    setFormData(prev => ({
      ...prev,
      dependents: [...prev.dependents, {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        ssn: '',
        relationship: '',
        liveWithTaxpayer: true
      }]
    }));
  };

  const updateDependent = (index: number, field: keyof Dependent, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      dependents: prev.dependents.map((dep, i) => 
        i === index ? { ...dep, [field]: value } : dep
      )
    }));
  };

  const removeDependent = (index: number) => {
    setFormData(prev => ({
      ...prev,
      dependents: prev.dependents.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    const clientSummary = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      maritalStatus: formData.maritalStatus,
      dependents: formData.dependents.length,
      hasForeiginAccounts: formData.hasForeiginAccounts,
      employmentStatus: formData.employmentStatus
    };
    
    onAdd(clientSummary);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Getting Started
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">How would you like to add this client?</h3>
              <p className="text-gray-600">Choose your preferred method to gather client information</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setIntakeMethod('upload')}
                className={`p-6 border-2 rounded-lg text-left transition-all ${
                  intakeMethod === 'upload' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CloudUpload className="w-8 h-8 text-blue-600 mb-3" />
                <h4 className="font-medium text-gray-900 mb-2">Upload Documents</h4>
                <p className="text-sm text-gray-600">Upload tax returns, W-2s, and other documents for automatic data extraction</p>
              </button>
              
              <button
                onClick={() => setIntakeMethod('manual')}
                className={`p-6 border-2 rounded-lg text-left transition-all ${
                  intakeMethod === 'manual' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <User className="w-8 h-8 text-blue-600 mb-3" />
                <h4 className="font-medium text-gray-900 mb-2">Manual Entry</h4>
                <p className="text-sm text-gray-600">Enter client information manually through our guided form</p>
              </button>
            </div>
            
            {intakeMethod === 'upload' && (
              <div className="mt-6 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="document-upload"
                />
                <label
                  htmlFor="document-upload"
                  className="cursor-pointer block text-center py-4"
                >
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB each</p>
                </label>
                
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <button
                          onClick={() => setUploadedFiles(files => files.filter((_, i) => i !== index))}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    
                    <button
                      onClick={processUploadedFiles}
                      disabled={isProcessing}
                      className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      {isProcessing ? 'Processing Documents...' : 'Process Uploaded Documents'}
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {isProcessing && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Extracting information from your documents...</p>
              </div>
            )}
            
            {extractedData && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-medium text-green-800">Documents processed successfully!</span>
                </div>
                <p className="text-sm text-green-700">
                  We've extracted information for {extractedData.firstName} {extractedData.lastName}. 
                  You can review and edit the details in the next steps.
                </p>
              </div>
            )}
          </div>
        );
        
      case 1: // Personal Information
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth *</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">SSN/ITIN *</label>
                <input
                  type="text"
                  placeholder="XXX-XX-XXXX"
                  value={formData.ssn}
                  onChange={(e) => setFormData({...formData, ssn: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Citizenship Status *</label>
              <select
                value={formData.citizenshipStatus}
                onChange={(e) => setFormData({...formData, citizenshipStatus: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select status</option>
                <option value="us_citizen">U.S. Citizen</option>
                <option value="green_card">Green Card Holder (Permanent Resident)</option>
                <option value="nonresident_alien">Nonresident Alien</option>
                <option value="resident_alien">Resident Alien</option>
              </select>
            </div>
            
            {(formData.citizenshipStatus === 'nonresident_alien' || formData.citizenshipStatus === 'resident_alien') && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Visa Type</label>
                  <input
                    type="text"
                    placeholder="e.g., H-1B, F-1, J-1"
                    value={formData.visaType}
                    onChange={(e) => setFormData({...formData, visaType: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Year in U.S.</label>
                  <input
                    type="number"
                    placeholder="YYYY"
                    value={formData.firstYearInUS}
                    onChange={(e) => setFormData({...formData, firstYearInUS: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        );
        
      case 2: // Family Details
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Family Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Marital Status *</label>
              <select
                value={formData.maritalStatus}
                onChange={(e) => setFormData({...formData, maritalStatus: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select status</option>
                <option value="single">Single</option>
                <option value="married">Married Filing Jointly</option>
                <option value="married_separate">Married Filing Separately</option>
                <option value="head_of_household">Head of Household</option>
                <option value="widowed">Qualifying Widow(er)</option>
              </select>
            </div>
            
            {(formData.maritalStatus === 'married' || formData.maritalStatus === 'married_separate') && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Spouse Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Spouse First Name</label>
                    <input
                      type="text"
                      value={formData.spouseFirstName}
                      onChange={(e) => setFormData({...formData, spouseFirstName: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Spouse Last Name</label>
                    <input
                      type="text"
                      value={formData.spouseLastName}
                      onChange={(e) => setFormData({...formData, spouseLastName: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Spouse SSN/ITIN</label>
                    <input
                      type="text"
                      placeholder="XXX-XX-XXXX"
                      value={formData.spouseSSN}
                      onChange={(e) => setFormData({...formData, spouseSSN: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Spouse Date of Birth</label>
                    <input
                      type="date"
                      value={formData.spouseDOB}
                      onChange={(e) => setFormData({...formData, spouseDOB: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">Dependents</h4>
                <button
                  type="button"
                  onClick={addDependent}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 inline mr-1" />
                  Add Dependent
                </button>
              </div>
              
              {formData.dependents.map((dependent, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg mb-3">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-gray-800">Dependent {index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => removeDependent(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">First Name</label>
                      <input
                        type="text"
                        value={dependent.firstName}
                        onChange={(e) => updateDependent(index, 'firstName', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last Name</label>
                      <input
                        type="text"
                        value={dependent.lastName}
                        onChange={(e) => updateDependent(index, 'lastName', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                      <input
                        type="date"
                        value={dependent.dateOfBirth}
                        onChange={(e) => updateDependent(index, 'dateOfBirth', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">SSN/ITIN</label>
                      <input
                        type="text"
                        placeholder="XXX-XX-XXXX"
                        value={dependent.ssn}
                        onChange={(e) => updateDependent(index, 'ssn', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Relationship</label>
                      <select
                        value={dependent.relationship}
                        onChange={(e) => updateDependent(index, 'relationship', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select relationship</option>
                        <option value="son">Son</option>
                        <option value="daughter">Daughter</option>
                        <option value="stepson">Stepson</option>
                        <option value="stepdaughter">Stepdaughter</option>
                        <option value="foster_child">Foster Child</option>
                        <option value="grandchild">Grandchild</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={dependent.liveWithTaxpayer}
                        onChange={(e) => updateDependent(index, 'liveWithTaxpayer', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-700">Lives with taxpayer</label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 3: // Address & Residency
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Address & Residency Information</h3>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Current Address</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Street Address *</label>
                  <input
                    type="text"
                    value={formData.currentAddress.street}
                    onChange={(e) => setFormData({
                      ...formData, 
                      currentAddress: {...formData.currentAddress, street: e.target.value}
                    })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City *</label>
                    <input
                      type="text"
                      value={formData.currentAddress.city}
                      onChange={(e) => setFormData({
                        ...formData, 
                        currentAddress: {...formData.currentAddress, city: e.target.value}
                      })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">State *</label>
                    <input
                      type="text"
                      value={formData.currentAddress.state}
                      onChange={(e) => setFormData({
                        ...formData, 
                        currentAddress: {...formData.currentAddress, state: e.target.value}
                      })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ZIP Code *</label>
                    <input
                      type="text"
                      value={formData.currentAddress.zipCode}
                      onChange={(e) => setFormData({
                        ...formData, 
                        currentAddress: {...formData.currentAddress, zipCode: e.target.value}
                      })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Home Ownership Status</label>
              <select
                value={formData.homeOwnership}
                onChange={(e) => setFormData({...formData, homeOwnership: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select status</option>
                <option value="own">Own</option>
                <option value="rent">Rent</option>
                <option value="live_with_family">Live with Family</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Did you move during the tax year?</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={!!formData.previousAddress.street}
                    onChange={(e) => {
                      if (!e.target.checked) {
                        setFormData({
                          ...formData,
                          previousAddress: { street: '', city: '', state: '', zipCode: '', country: '', dateMovedFrom: '' }
                        });
                      }
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="text-sm text-gray-700">Yes, I moved during the tax year</label>
                </div>
                
                {formData.previousAddress.street !== '' && (
                  <div className="space-y-3 mt-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Previous Address</label>
                      <input
                        type="text"
                        value={formData.previousAddress.street}
                        onChange={(e) => setFormData({
                          ...formData, 
                          previousAddress: {...formData.previousAddress, street: e.target.value}
                        })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <input
                          type="text"
                          value={formData.previousAddress.city}
                          onChange={(e) => setFormData({
                            ...formData, 
                            previousAddress: {...formData.previousAddress, city: e.target.value}
                          })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">State</label>
                        <input
                          type="text"
                          value={formData.previousAddress.state}
                          onChange={(e) => setFormData({
                            ...formData, 
                            previousAddress: {...formData.previousAddress, state: e.target.value}
                          })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                        <input
                          type="text"
                          value={formData.previousAddress.zipCode}
                          onChange={(e) => setFormData({
                            ...formData, 
                            previousAddress: {...formData.previousAddress, zipCode: e.target.value}
                          })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Date Moved</label>
                        <input
                          type="date"
                          value={formData.previousAddress.dateMovedFrom}
                          onChange={(e) => setFormData({
                            ...formData, 
                            previousAddress: {...formData.previousAddress, dateMovedFrom: e.target.value}
                          })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        
      case 4: // Financial Accounts
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Accounts Information</h3>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="font-medium text-yellow-800">Important FBAR & FATCA Requirements</span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">
                Foreign accounts over $10,000 must be reported. FATCA reporting may be required for assets over $50,000.
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Do you have any foreign financial accounts? *
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="hasForeiginAccounts"
                    value="true"
                    checked={formData.hasForeiginAccounts === true}
                    onChange={() => setFormData({...formData, hasForeiginAccounts: true})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label className="ml-2 text-sm text-gray-700">Yes</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="hasForeiginAccounts"
                    value="false"
                    checked={formData.hasForeiginAccounts === false}
                    onChange={() => setFormData({...formData, hasForeiginAccounts: false})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label className="ml-2 text-sm text-gray-700">No</label>
                </div>
              </div>
            </div>
            
            {formData.hasForeiginAccounts && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Foreign Account Details</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Maximum value of all foreign accounts during the year
                  </label>
                  <select
                    value={formData.foreignAccountsValue}
                    onChange={(e) => setFormData({...formData, foreignAccountsValue: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select range</option>
                    <option value="under_10k">Under $10,000</option>
                    <option value="10k_50k">$10,000 - $50,000</option>
                    <option value="50k_200k">$50,000 - $200,000</option>
                    <option value="over_200k">Over $200,000</option>
                  </select>
                </div>
                
                {(formData.foreignAccountsValue === '10k_50k' || 
                  formData.foreignAccountsValue === '50k_200k' || 
                  formData.foreignAccountsValue === 'over_200k') && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
                    <p className="text-sm text-red-700">
                      <strong>FBAR Filing Required:</strong> You must file FinCEN Form 114 by April 15th.
                    </p>
                  </div>
                )}
                
                {(formData.foreignAccountsValue === '50k_200k' || 
                  formData.foreignAccountsValue === 'over_200k') && (
                  <div className="mt-2 p-3 bg-orange-50 border border-orange-200 rounded">
                    <p className="text-sm text-orange-700">
                      <strong>FATCA Filing May Be Required:</strong> Form 8938 may need to be filed with your tax return.
                    </p>
                  </div>
                )}
              </div>
            )}
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Other Financial Information</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.hasRetirementAccounts}
                    onChange={(e) => setFormData({...formData, hasRetirementAccounts: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">401(k), IRA, or other retirement accounts</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.hasInvestmentIncome}
                    onChange={(e) => setFormData({...formData, hasInvestmentIncome: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">Investment income (dividends, capital gains, etc.)</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.hasRentalProperty}
                    onChange={(e) => setFormData({...formData, hasRentalProperty: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">Rental property income</label>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 5: // Income & Employment
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Income & Employment Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Employment Status *</label>
              <select
                value={formData.employmentStatus}
                onChange={(e) => setFormData({...formData, employmentStatus: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select status</option>
                <option value="employed">Employed (W-2)</option>
                <option value="self_employed">Self-Employed (1099)</option>
                <option value="both">Both W-2 and 1099</option>
                <option value="retired">Retired</option>
                <option value="unemployed">Unemployed</option>
                <option value="student">Student</option>
              </select>
            </div>
            
            {(formData.employmentStatus === 'employed' || formData.employmentStatus === 'both') && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Employment Information</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Employer Name</label>
                  <input
                    type="text"
                    value={formData.employer}
                    onChange={(e) => setFormData({...formData, employer: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}
            
            {(formData.employmentStatus === 'self_employed' || formData.employmentStatus === 'both') && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Self-Employment Information</h4>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.selfEmployed}
                    onChange={(e) => setFormData({...formData, selfEmployed: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">I received 1099 income or have self-employment income</label>
                </div>
              </div>
            )}
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Other Income Sources</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.hasCharitableContributions}
                    onChange={(e) => setFormData({...formData, hasCharitableContributions: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">Charitable contributions</label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Health Insurance Coverage</label>
                  <select
                    value={formData.hasHealthInsurance}
                    onChange={(e) => setFormData({...formData, hasHealthInsurance: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select coverage</option>
                    <option value="yes_all_year">Yes, all year</option>
                    <option value="yes_partial">Yes, part of the year</option>
                    <option value="no">No coverage</option>
                    <option value="exempt">Exempt from coverage requirement</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 6: // Tax History
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Previous Tax Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Did you file a tax return last year? *
              </label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="filedLastYear"
                    value="yes"
                    checked={formData.filedLastYear === 'yes'}
                    onChange={(e) => setFormData({...formData, filedLastYear: e.target.value})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label className="ml-2 text-sm text-gray-700">Yes</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="filedLastYear"
                    value="no"
                    checked={formData.filedLastYear === 'no'}
                    onChange={(e) => setFormData({...formData, filedLastYear: e.target.value})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label className="ml-2 text-sm text-gray-700">No</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="filedLastYear"
                    value="first_time"
                    checked={formData.filedLastYear === 'first_time'}
                    onChange={(e) => setFormData({...formData, filedLastYear: e.target.value})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label className="ml-2 text-sm text-gray-700">This is my first year filing</label>
                </div>
              </div>
            </div>
            
            {formData.filedLastYear === 'yes' && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Prior Year Information</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Prior Year Adjusted Gross Income (AGI)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter amount from last year's return"
                    value={formData.priorYearAGI}
                    onChange={(e) => setFormData({...formData, priorYearAGI: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    This helps us verify your identity and may be required for e-filing
                  </p>
                </div>
              </div>
            )}
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Outstanding Tax Issues</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.hasOutstandingIssues}
                    onChange={(e) => setFormData({...formData, hasOutstandingIssues: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    I have outstanding tax issues (audits, collections, etc.)
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.needsAmendedReturn}
                    onChange={(e) => setFormData({...formData, needsAmendedReturn: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    I need to amend a previous year's return
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Special Circumstances or Additional Information
              </label>
              <textarea
                rows={4}
                value={formData.specialCircumstances}
                onChange={(e) => setFormData({...formData, specialCircumstances: e.target.value})}
                placeholder="Please describe any special circumstances, life changes, or additional information that might affect your tax situation..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        );
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Review Client Information</h3>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Personal Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Name:</span>
                  <span className="ml-2 font-medium">{formData.firstName} {formData.lastName}</span>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <span className="ml-2">{formData.email}</span>
                </div>
                <div>
                  <span className="text-gray-600">Phone:</span>
                  <span className="ml-2">{formData.phone}</span>
                </div>
                <div>
                  <span className="text-gray-600">Marital Status:</span>
                  <span className="ml-2 capitalize">{formData.maritalStatus?.replace('_', ' ')}</span>
                </div>
              </div>
            </div>
            
            {formData.dependents.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Dependents ({formData.dependents.length})</h4>
                {formData.dependents.map((dep, index) => (
                  <div key={index} className="text-sm mb-2">
                    <span className="font-medium">{dep.firstName} {dep.lastName}</span>
                    <span className="text-gray-600 ml-2">({dep.relationship})</span>
                  </div>
                ))}
              </div>
            )}
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-medium text-blue-800">Ready to Submit</span>
              </div>
              <p className="text-sm text-blue-700 mt-1">
                Please review all information above. You can always edit client details after submission.
              </p>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-600">This step is under construction. Please use the navigation to go to other steps.</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Client</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={index} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    isActive ? 'bg-blue-600 text-white' :
                    isCompleted ? 'bg-green-600 text-white' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="ml-2 hidden sm:block">
                    <p className={`text-sm font-medium ${
                      isActive ? 'text-blue-600' :
                      isCompleted ? 'text-green-600' :
                      'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {renderStepContent()}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            onClick={prevStep}
            disabled={currentStep === 0 || (currentStep === 1 && intakeMethod === 'upload' && !extractedData)}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Save as Draft
            </button>
            
            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Add Client
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={currentStep === 0 && !intakeMethod}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const AITaskCenter = ({ tasks, onTaskAction }: AITaskCenterProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClient, setSelectedClient] = useState('');
  const tasksPerPage = 5;
  
  // Get unique clients for filter dropdown
  const uniqueClients = [...new Set(tasks.map(task => task.client))].sort();
  
  // Filter tasks based on selected client
  const filteredTasks = selectedClient 
    ? tasks.filter(task => task.client === selectedClient)
    : tasks;
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const paginatedTasks = filteredTasks.slice(startIndex, startIndex + tasksPerPage);
  
  // Reset to page 1 when filter changes
  const handleClientFilterChange = (client: string) => {
    setSelectedClient(client);
    setCurrentPage(1);
  };
  
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">AI Task Center</h1>
        <p className="text-gray-600">Review AI-generated deduction suggestions and tasks</p>
      </div>

      {/* Filter Controls */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Client</label>
            <select
              value={selectedClient}
              onChange={(e) => handleClientFilterChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Clients</option>
              {uniqueClients.map(client => (
                <option key={client} value={client}>{client}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1}-{Math.min(startIndex + tasksPerPage, filteredTasks.length)} of {filteredTasks.length} tasks
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Confidence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IRS Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedTasks.map(task => (
                <tr key={task.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {task.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{task.client}</div>
                    <div className="text-sm text-gray-500">{task.category}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{task.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        task.confidence >= 80 ? 'bg-green-400' :
                        task.confidence >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                      }`}></div>
                      <span className="text-sm text-gray-900">{task.confidence}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {task.irsCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task.status ? (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        task.status === 'reviewed' ? 'bg-green-100 text-green-800' :
                        task.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {task.status}
                      </span>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onTaskAction(task.id, 'reviewed')}
                          className="text-green-600 hover:text-green-800"
                          title="Mark Reviewed"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onTaskAction(task.id, 'rejected')}
                          className="text-red-600 hover:text-red-800"
                          title="Reject"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onTaskAction(task.id, 'noted')}
                          className="text-blue-600 hover:text-blue-800"
                          title="Add Note"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
          
          <div className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}
    </div>
  );
};

const UploadDemo = ({ uploadProgress, isUploading, onUpload }: UploadDemoProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
    setExtractedData(null);
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    
    onUpload();
    
    // Simulate extraction results after upload completes
    setTimeout(() => {
      setExtractedData({
        firstName: "John",
        lastName: "Smith",
        client: "John Smith",
        taxYear: "2024",
        income: "$75,000",
        deductions: [
          { type: "Student Loan Interest", amount: "$2,500", confidence: "89%" },
          { type: "Charitable Contributions", amount: "$3,200", confidence: "76%" },
          { type: "State/Local Taxes", amount: "$8,500", confidence: "95%" }
        ],
        suggestedOptimizations: [
          "Consider itemizing deductions instead of standard deduction",
          "Maximize retirement contributions for additional tax benefits",
          "Review potential business expense deductions"
        ],
        dateOfBirth: "1985-03-15",
        ssn: "123-45-6789",
        email: "john.smith@email.com",
        phone: "(555) 123-4567",
        maritalStatus: "single",
        spouseFirstName: "",
        spouseLastName: "",
        currentAddress: {
          street: "123 Main St",
          city: "Austin",
          state: "TX",
          zipCode: "78701",
          country: "United States"
        },
        employmentStatus: "employed",
        employer: "Tech Corp Inc"
      });
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Upload Tax Documents</h1>
        <p className="text-gray-600">Upload prior-year tax returns for AI analysis</p>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm mb-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Upload PDF Tax Return</h3>
          <p className="mt-1 text-sm text-gray-500">
            Select a PDF file to analyze for deduction opportunities
          </p>
          
          <div className="mt-4 space-y-3">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Select File</span>
            </label>
            
            {/* Start Analysis Button - Added here */}
            <div>
              <button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className={`px-6 py-2 rounded-lg font-medium inline-flex items-center space-x-2 ${
                  selectedFile && !isUploading 
                    ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Brain className="w-4 h-4" />
                <span>Start Analysis</span>
              </button>
            </div>
          </div>
          
          {selectedFile && (
            <div className="mt-4 text-sm text-gray-600">
              Selected: {selectedFile.name}
            </div>
          )}
        </div>

        {isUploading && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Extracting data...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {extractedData && (
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Extraction Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Basic Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Client:</span>
                  <span className="text-gray-900">{extractedData.client}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax Year:</span>
                  <span className="text-gray-900">{extractedData.taxYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Income:</span>
                  <span className="text-gray-900">{extractedData.income}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Identified Deductions</h4>
              <div className="space-y-2">
                {extractedData.deductions.map((deduction, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <div>
                      <span className="text-gray-900">{deduction.type}</span>
                      <span className="text-gray-500 ml-2">({deduction.confidence})</span>
                    </div>
                    <span className="font-medium text-gray-900">{deduction.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-3">AI Optimization Suggestions</h4>
            <ul className="space-y-2">
              {extractedData.suggestedOptimizations.map((suggestion, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;