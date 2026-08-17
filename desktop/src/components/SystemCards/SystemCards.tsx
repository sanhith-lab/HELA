import "./SystemCards.css";

const cards = [
  {
    title: "CPU",
    value: "12%"
  },
  {
    title: "GPU",
    value: "18%"
  },
  {
    title: "Memory",
    value: "1245 Items"
  },
  {
    title: "Agents",
    value: "7 Active"
  }
];

export default function SystemCards() {

  return (

<div className="cards-grid">

{cards.map(card=>(

<div
className="system-card"
key={card.title}
>

<h3>{card.title}</h3>

<p>{card.value}</p>

</div>

))}

</div>

  );

}