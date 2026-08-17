import "./Finance.css";
import {
  Wallet,
  Landmark,
  TrendingUp,
  PiggyBank,
  Upload,
  Search,
} from "lucide-react";

export default function Finance() {
  return (
    <div className="finance-window">

      <div className="finance-header">

        <div>
          <h1>Finance Workspace</h1>
          <p>Manage expenses, budgets and investments.</p>
        </div>

        <button className="upload-btn">
          <Upload size={18}/>
          Import Statement
        </button>

      </div>

      <div className="finance-search">

        <Search size={18}/>

        <input
          type="text"
          placeholder="Search transactions..."
        />

      </div>

      <div className="finance-grid">

        <div className="finance-card">
          <Wallet size={34}/>
          <h3>Expenses</h3>
          <p>Track daily spending.</p>
        </div>

        <div className="finance-card">
          <PiggyBank size={34}/>
          <h3>Budget</h3>
          <p>Manage monthly budget.</p>
        </div>

        <div className="finance-card">
          <TrendingUp size={34}/>
          <h3>Investments</h3>
          <p>Monitor portfolio growth.</p>
        </div>

        <div className="finance-card">
          <Landmark size={34}/>
          <h3>Accounts</h3>
          <p>View linked accounts.</p>
        </div>

      </div>

      <div className="finance-history">

        <h2>Recent Activity</h2>

        <div className="finance-item">
          Grocery Purchase
        </div>

        <div className="finance-item">
          Salary Credit
        </div>

        <div className="finance-item">
          SIP Investment
        </div>

      </div>

    </div>
  );
}