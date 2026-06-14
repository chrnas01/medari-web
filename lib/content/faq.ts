export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ: FaqItem[] = [
  { q: "Do I need to be using Best Practice?", a: "Currently, Medari integrates with Best Practice Software. Additional practice management system integrations are planned in future releases." },
  { q: "How does the 30-day free trial work?", a: "Start your free trial with a valid credit card. You won't be charged during the trial period and can cancel any time before your trial ends." },
  { q: "Is there a lock-in contract?", a: "No. All plans are month-to-month unless you choose annual billing." },
  { q: "How long does setup take?", a: "Most Practices can be up and running within minutes. Connect your Practice, import your team, and Medari begins analysing historical activity to generate workforce insights." },
  { q: "Does Medari roster doctors?", a: "No. Medari does not treat GPs as employees or create GP rosters. Instead, it helps Practices manage GP availability, clinical sessions, room allocation and workforce capacity — so planning aligns with how Practices actually operate." },
  { q: "What staff can Medari help manage?", a: "Receptionists, nurses, Practice Managers, administration teams, allied health professionals, specialists, contractors and support staff." },
  { q: "How does demand forecasting work?", a: "Medari analyses historical Practice activity and appointment patterns to predict future demand, helping identify peak periods, quiet periods, staffing gaps and capacity constraints before problems occur." },
  { q: "What happens if I have no historical data?", a: "Medari supports both cold-start and warm-start Practices. For new Practices, you can enter workforce preferences, availability, operational rules and target hours. As Medari collects data, forecasting and recommendations become increasingly accurate." },
  { q: "Can Medari manage multiple locations?", a: "Yes — multi-location workforce planning and reporting." },
  { q: "Can staff access Medari on mobile?", a: "Yes. Staff can view schedules, update availability, submit timesheets and receive notifications from any device." },
  { q: "Is my data secure?", a: "Yes. Medari follows industry security standards and only accesses the data required to provide workforce planning and forecasting. Data remains owned by the Practice." },
  { q: "Can I cancel anytime?", a: "Yes. You can cancel any time before your next billing cycle. There are no lock-in contracts." },
];
