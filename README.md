# 🌿 Gestionale Canapa - Hemp Processing Management System

**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Live:** https://gestionalecanapa.vercel.app

## 📋 Descrizione

Applicazione web completa per la gestione della lavorazione della canapa industriale. Sistema di tracciamento end-to-end dalle materie prime al prodotto finito, con integrazione database cloud Supabase.

## ⚙️ Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS (Dark Theme)
- **Database:** Supabase (PostgreSQL)
- **Backend:** Supabase REST API + RLS
- **Hosting:** Vercel (Auto-deploy from GitHub)
- **UI Components:** lucide-react icons
- **State Management:** React Context + localStorage

## 🏭 Funzionalità Principali

### Sale di Lavorazione (Stages)
1. **Ingresso Grezzo** - Registrazione materie prime
2. **Sala Sbocciolo** - Decortificazione fiori
3. **Sala Beta** - Selezione e calibratura
4. **Sala Rifinitura** - Confezione finale
5. **Magazzino Finiti** - Stoccaggio prodotti
6. **Contabilità** - Gestione economica

### Funzionalità Database
- ✅ Salvataggio automatico su Supabase
- ✅ Tracciamento per lotto/varietà
- ✅ Bilancio peso ingresso/uscita (tolleranza ±2%)
- ✅ Categorizzazione per tipo
- ✅ Audit log completo

### Anagrafiche
- Gestione fornitori
- Gestione varietà canapa
- Gestione prodotti finiti
- Gestione utenti operatori

## 📁 Struttura Progetto

```
src/
├── pages/              # Pagine dell'app
├── components/         # Componenti riutilizzabili
├── context/            # React Context globale
├── lib/                # Utility (supabase, auth, config)
├── data/               # Dati statici
├── types.ts            # Definizioni TypeScript
└── index.css           # Stili

sql/
└── processing_runs.sql # Schema Supabase
```

## 🚀 URL Live

🌐 **App Online:** https://gestionalecanapa.vercel.app  
📊 **GitHub:** https://github.com/Jurefarm/gestionalecanapa  
🗄️ **Database:** Supabase (wrmvrsulhxmplptxveem)

## 🔄 Deployment Flow

```
Local Changes
     ↓
git push origin main
     ↓
GitHub
     ↓
Vercel (Auto-trigger)
     ↓
https://gestionalecanapa.vercel.app (Live Update)
```

## 🛠️ Sviluppo Locale

```bash
npm install      # Installa dipendenze
npm run dev      # Dev server (http://localhost:5173)
npm run build    # Build produzione
npm run preview  # Anteprima build
```

## 📦 Dipendenze

- react@^18
- @supabase/supabase-js@^2
- lucide-react
- tailwindcss@^3
- typescript@^5
- vite@^5

## ✅ Completamento

- ✅ Setup React + TypeScript + Vite
- ✅ Pagine complete (6 sale + Dashboard)
- ✅ Context globale + localStorage
- ✅ Supabase integration completa
- ✅ Database `processing_runs` con RLS
- ✅ Tailwind dark theme
- ✅ GitHub repository
- ✅ Vercel auto-deploy
- ✅ Production ready

---

**Updated:** 30 Nov 2025 | **Author:** Jurefarm | **License:** Proprietario
