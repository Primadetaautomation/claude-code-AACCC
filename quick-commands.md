# 🎮 Claude Auto - Quick Commands

## 🚦 Snel Aan/Uit Zetten

### ❌ **UITZETTEN** (geen kosten)
```bash
claude-auto --disable
```
Dit schakelt ALLE API calls uit. Je gebruikt alleen lokale Claude.

### ✅ **AANZETTEN** 
```bash
claude-auto --enable
```
Dit schakelt API mode weer in voor complexe taken.

### 📊 **STATUS CHECKEN**
```bash
claude-auto --status
```
Zie huidige status en kosten.

## 💰 Kosten Beheer

### 🎛️ **COST CONTROL CENTER**
```bash
claude-auto --cost-control
```
Interactief menu voor:
- Cost limits instellen
- Waarschuwingen configureren
- Usage statistics bekijken
- Emergency shutdown

## 🚨 Noodgevallen

### 🛑 **EMERGENCY SHUTDOWN**
```bash
# In cost control menu, kies optie 8
claude-auto --cost-control
# Kies: 8 (Emergency shutdown)
```
Dit zet ALLES uit om kosten te stoppen.

## 💡 Slimme Tips

### 1. **Dagelijks Limiet**
```bash
claude-auto --cost-control
# Kies optie 3
# Vul in: 5 (voor $5 per dag)
```

### 2. **Bevestiging Vereisen**
```bash
claude-auto --cost-control
# Kies optie 5
```
Nu vraagt het systeem toestemming voor elke API call.

### 3. **Alleen Lokaal Werken**
```bash
# Voor vandaag alleen lokaal
claude-auto --disable

# Morgen weer normaal
claude-auto --enable
```

## 📈 Kosten Overzicht

| Actie | Command | Effect |
|-------|---------|--------|
| Uit | `--disable` | Geen kosten |
| Aan | `--enable` | Normale werking |
| Check | `--status` | Zie huidige kosten |
| Beheer | `--cost-control` | Volledig beheer |

## 🔄 Environment Variables

Voor tijdelijk uitschakelen zonder settings te wijzigen:
```bash
# Forceer lokaal voor deze sessie
export CLAUDE_FORCE_LOCAL=true
claude-auto "your task"

# Reset
unset CLAUDE_FORCE_LOCAL
```

## 💵 Kosten Indicatie

- **Lokale Claude**: €0,00 (gratis)
- **API Mode**: ~€0,015 per call
- **Gemiddeld dagelijks**: €0,50 - €2,00 (afhankelijk van gebruik)

## 🛡️ Veiligheid Features

1. **Auto-shutoff** bij cost limit
2. **Waarschuwingen** bij threshold
3. **Fallback** naar lokaal bij fouten
4. **Usage tracking** per dag
5. **Emergency shutdown** optie

---

💡 **TIP**: Begin met een dagelijks limiet van $5 en pas aan naar behoefte!