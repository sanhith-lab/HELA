import "./Marketplace.css";
import {
  Search,
  Download,
  Star,
  Bot,
  Workflow,
  Palette,
  Sparkles,
} from "lucide-react";

export default function Marketplace() {
  return (
    <div className="marketplace-window">

      <div className="marketplace-header">

        <div>
          <h1>Marketplace</h1>
          <p>Discover agents, templates, themes and AI tools.</p>
        </div>

      </div>

      <div className="marketplace-search">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search Marketplace..."
        />

      </div>

      <div className="market-grid">

        <div className="market-card">

          <Bot size={34} />

          <h3>Assignment Agent</h3>

          <p>AI agent for assignment assistance.</p>

          <div className="market-footer">
            <span><Star size={15}/>4.9</span>

            <button>
              <Download size={16}/>
              Install
            </button>
          </div>

        </div>

        <div className="market-card">

          <Workflow size={34} />

          <h3>Research Workflow</h3>

          <p>Automated research pipeline.</p>

          <div className="market-footer">
            <span><Star size={15}/>4.8</span>

            <button>
              <Download size={16}/>
              Install
            </button>
          </div>

        </div>

        <div className="market-card">

          <Palette size={34} />

          <h3>Cyber Theme</h3>

          <p>Dark futuristic interface.</p>

          <div className="market-footer">
            <span><Star size={15}/>5.0</span>

            <button>
              <Download size={16}/>
              Install
            </button>
          </div>

        </div>

        <div className="market-card">

          <Sparkles size={34} />

          <h3>Prompt Pack</h3>

          <p>Professional AI prompt library.</p>

          <div className="market-footer">
            <span><Star size={15}/>4.7</span>

            <button>
              <Download size={16}/>
              Install
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}