with open('src/components/layout/Navbar.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

if 'Truck' not in content:
    content = content.replace("HelpCircle } from 'lucide-react';", "HelpCircle, Truck } from 'lucide-react';")

new_links = """        {/* Right side links */}
        <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link to="/track" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Truck className="w-4 h-4" /> Track Order
          </Link>
          <div className="h-4 w-px bg-slate-700 hidden xl:block"></div>
          <Link to="/help" className="flex items-center gap-1.5 hover:text-white transition-colors hidden xl:flex">
            <HelpCircle className="w-4 h-4" /> Help
          </Link>
          <Link to="/buyer-protection" className="flex items-center gap-1.5 hover:text-white transition-colors hidden xl:flex">
            <Shield className="w-4 h-4" /> Buyer Protection
          </Link>
          <div className="h-4 w-px bg-slate-700"></div>
          <Link to="/app" className="flex items-center gap-1.5 hover:text-white transition-colors text-orange-400 hover:text-orange-300">
            <Smartphone className="w-4 h-4" /> Download App
          </Link>
        </div>"""

old_links = """        {/* Right side links */}
        <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link to="/help" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <HelpCircle className="w-4 h-4" /> Help
          </Link>
          <Link to="/buyer-protection" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Shield className="w-4 h-4" /> Buyer Protection
          </Link>
          <div className="h-4 w-px bg-slate-700"></div>
          <Link to="/app" className="flex items-center gap-1.5 hover:text-white transition-colors text-orange-400 hover:text-orange-300">
            <Smartphone className="w-4 h-4" /> Download App
          </Link>
        </div>"""

content = content.replace(old_links, new_links)

with open('src/components/layout/Navbar.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
