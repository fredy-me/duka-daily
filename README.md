# Duka Daily

this is mobile

Build a mobile-first business management app UI/UX prototype called "[App Name — TBD]" for a single-shop Tanzanian duka (daily necessities retailer) run by an Admin/Owner with two Sellers/Cashiers under him. This is UI/UX ONLY — use realistic mock data throughout, no backend logic or real data connections needed. Use React, Tailwind CSS, and shadcn/ui as the foundation, but design every screen mobile-first: single-column, portrait orientation, bottom tab navigation, thumb-reachable primary actions. This is a prototype for demonstration on a phone screen, not a responsive desktop layout.

=== DESIGN LANGUAGE === Aesthetic: Apple-inspired premium minimalism — calm, spacious, intentional. Simplicity over complexity, always. This must also work for an elderly, non-technical primary user, so legibility and confidence take priority over density anywhere the two goals conflict.

Color: Strictly black, white, and grayscale. Near-black (#0A0A0A) for primary text and dark surfaces, pure white (#FFFFFF) for light surfaces, a soft gray scale (#F5F5F5, #E5E5E5, #A3A3A3, #737373) for backgrounds, borders, and secondary text. No bright colors anywhere. Reserve ONE muted accent (a soft red-gray, not bright red) exclusively for totals, closing balances, and critical states (low stock, pending correction, overdue) — this mirrors the red-highlighted totals in the paper ledger this app is replacing, so keep that visual association intentional, not decorative.

Typography: "Inter" or system-ui font stack. Base body text sized larger than typical mobile defaults (minimum 16px, prefer 17-18px) — this app's primary user is aged. Large bold page titles, medium-weight section headers, generous line-height throughout. No cramped text anywhere.

Shape language: Consistently rounded. Cards use large radius (20-24px), buttons pill-shaped or 12-16px radius, inputs 10-12px radius. Never sharp 0px corners.

Touch targets: Minimum 48x48px on every interactive element — buttons, list rows, tab bar icons. This is non-negotiable given the primary user.

Cards: Soft, barely-visible shadow, thin 1px hairline border in light gray, generous internal padding (20px+). One clear focal point per card.

Dialogs/Modals: Centered, rounded corners, subtle backdrop blur, short title, one line of description, clear primary + secondary button pair. Model directly on iOS/macOS system alert dialogs.

Buttons: Primary = solid black with white text, pill or rounded-rect shape, full-width on mobile where it's the main action. Secondary = outlined/ghost style. No gradients, no heavy drop shadows.

Icons: Simple thin-line icons (Lucide style), monochrome, always paired with a text label — never icon-only, given the primary user.

Spacing: Generous whitespace on an 8pt grid. Never let a screen feel dense or busy. One primary action per screen wherever possible.

Language: ALL UI text, labels, and buttons are in Swahili — see the exact labels specified per screen below. No English text anywhere in the interface itself (English here is only for describing the prompt).

Avoid entirely: gradients, neumorphism, heavy shadows, bright/saturated colors, decorative illustrations, cluttered screens, icon-only buttons, more than one competing focal point per screen.

=== ENTRY POINT === Splash/login screen: logo placeholder, then two large, clearly separated buttons — "Ingia kama Admin" and "Ingia kama Muuzaji" — followed by a simple phone number/PIN login field once a role is picked.

=== NAVIGATION — ADMIN === Bottom tab bar (5 primary tabs, rest under "Zaidi"/More): Mwanzo (Home), Bidhaa (Products), Mauzo (Sales), Ripoti (Reports), Zaidi (More — houses Bajeti, Ukaguzi wa Hisa, Wakala, Marekebisho, Makabidhiano, Watumiaji, Mipangilio).

=== NAVIGATION — SELLER === Bottom tab bar (3 tabs only): Uza (Sell), Mauzo Yangu (My Sales), Mipangilio (Settings — limited, see below).

=== ADMIN SCREENS TO BUILD ===

Mwanzo (Dashboard/Home) — today's date at top. Grid of rounded stat cards: Salio la Kuanza (Opening Stock Value), Jumla ya Bidhaa Zilizopo (Total Stock Available), Mauzo ya Leo (Today's Sales so far), Salio la Kufunga linalotarajiwa (running Closing estimate, in the muted accent color). Recent activity list below (last few sales/purchases). One clean line chart of the sales trend over the past 7 days.

Manunuzi (Purchases) — list of purchases, most recent first. "Ongeza Manunuzi" opens a dialog: Jina la Bidhaa, Msambazaji, Kipimo, Idadi, Bei ya Kununulia, Bei ya Kuuzia — totals (Jumla) calculate live as fields fill in. Show a small badge on the product if this purchase is its first-ever entry ("Bidhaa Mpya") vs a restock, and flag if the price changed from last time.

Bidhaa (Products) — searchable card grid, each showing name, current stock qty, current selling price. Tap into any product → detail screen with a clean vertical timeline: "Ilisajiliwa" (registered) date, every restock event, every price change event, each with date/qty/price.

Mauzo ya Leo (Today's Sales, read-only) — live list of individual sales as sellers record them, each showing product, qty, price, which seller made it, and time. Running total at the top matching the Mwanzo stat card.

Ripoti (Reports) — segmented date-range control (Leo / Jana / Wiki hii / Mwezi huu / Kipindi Maalum / Mwaka). Three separate tabs beneath, never combined: Mauzo, Matumizi, Hisa (Stock). Each tab: one clean chart, summary stat cards, and a detail table beneath.

Bajeti (Budget) — current month card showing Mapato Halisi (Faida, in the accent color, clearly labeled "imehesabiwa kiotomatiki" / calculated automatically) and Matumizi Halisi as a running total. Below: expense list (date, note, amount). "Ongeza Matumizi" opens a simple dialog.

Ukaguzi wa Hisa (Stocktaking) — product list or "Kaguza Zote" (check all). Each row: system quantity vs. an input field for counted quantity. Variance shown calmly (not alarmingly) once entered. "Thibitisha Marekebisho" submits for Admin approval — since Admin IS the approver here, this can confirm and apply immediately, but must log the before/after values and timestamp regardless.

Wakala — list of money-agent sources (M-Pesa, Tigo Pesa, Airtel Money, Halopesa) as cards, each showing this month's commission total. Tap into one → simple log of individual commission entries with date and amount. Monthly report view showing commission by source, side by side.

Marekebisho (Correction Requests) — inbox list, each row: which seller flagged it, which record, their note, status badge (Inasubiri / Imekubaliwa / Imekataliwa). Tap in → detail view with an "Kubali na Rekebisha" (Approve & Correct) action showing before/after fields, and a "Kataa" (Reject) action.

Makabidhiano (Handover) — new handover flow: select Mtoaji (outgoing) and Mpokeaji (incoming) from the user list, enter counted cash amount and a quick stock snapshot/confirmation, system shows expected vs. entered values with any variance displayed calmly (model this directly on a cash-reconciliation pattern — expected vs counted, clear but not alarming). Both parties see a confirmation screen before it's finalized. History tab below shows past handovers as a clean timeline.

Watumiaji (Users) — list of Muuzaji 1 and Muuzaji 2 with role badge. "Ongeza Mtumiaji" dialog: name, phone number, role.

Mipangilio (Settings) — Taarifa za Duka (shop name, address), Lugha (language — Swahili default, toggle if needed), Arifa (notifications on/off), Hifadhi Nakala (backup/sync status indicator — shows last synced time, reassures data is safe), Akaunti (account/security, change PIN), Msaada (help/about).

=== SELLER SCREENS TO BUILD ===

Uza (Sell) — product search bar and a grid of rounded product cards (name, current price). Tap a product → quantity stepper appears inline or in a small sheet. Running cart/total shown persistently at the bottom. "Kamilisha Mauzo" opens a confirmation dialog showing what's being sold and the total, then confirms — instantly reflected in today's Mauzo.

Mauzo Yangu (My Sales) — read-only list of this seller's own sales, Leo/Wiki hii toggle at top, running total. No edit affordance anywhere on this screen.

Ripoti Hitilafu (Report an Issue) — reachable from any sale in Mauzo Yangu via a small "Nimeona Hitilafu" button on that row. Opens a simple form: auto-fills which record, a short reason field, "Tuma kwa Admin" button. Confirmation message on submit ("Imetumwa, Admin ataangalia").

Mipangilio (Settings, limited) — Lugha, Akaunti (change PIN), Toka (log out) only. No shop-level or business settings visible here.

=== MOCK DATA === Populate every screen with realistic data for a small Tanzanian duka. Products: sukari, mchele, unga wa ngano, mafuta ya kupikia, sabuni, maharage, chumvi, mkate, soda, biskuti — with realistic small quantities and TZS prices (e.g., "Sukari 2kg — 6,500 TZS"). Currency always formatted as TZS. Supplier names should sound like small Tanzanian wholesalers. Sellers named realistically (e.g., "Juma", "Neema"). Wakala sources: M-Pesa, Tigo Pesa, Airtel Money, Halopesa, each with a plausible monthly commission figure (tens of thousands of TZS range, not millions — this is a small shop's side commission, not its main income).

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
