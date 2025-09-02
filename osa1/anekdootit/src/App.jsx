// Lopullinen versio näyttää myös eniten ääniä saaneen anekdootin, jos suurimman äänimäärän 
// saaneita anekdootteja on useita, riittää että niistä näytetään yksi.
import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  // selected on tila, tyypiltään numero, joka kertoo satunnaisen anekdootin, kyseinen 
  // kerrottava anekdootti saadaan anecdotes-taulukosta selected numeron määrittämästä
  // indeksin kohdasta. Oletuksena indeksi on nolla eli anecdotes[0].
  const [selected, setSelected] = useState(0)

  // Luo taulukon/tilan jossa on kahdeksan nolla numeroa. Taulukon sisältöä voi muuttaa, 
  // vaikka taulukko on määritelty const:ksi. Tämä johtuu siitä, että taulukko on olio.
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0])

  // Tapahtumankäsittelijä(funktio), joka arpoo satunnaisen kokonaisluvun väliltä 0-7 ja 
  // asettaa sen tilaksi selected:
  const handleNextRandom = () => {
    // Taklataan updateIndex:illä ReActin asynkroninen tilan päivitysongelma:
    let updateIndex = 0
    // Kutsuu funktiota GetRandomInt arpomaan kokonaisluvun, joka on 8 pienempi:
    updateIndex = GetRandomInt(8)
    // Asettaa arvotun kokonaisluvun selected-tilaksi
    setSelected(updateIndex)
  }

  // Tapahtumankäsittelijä, joka päivittää anekdooteille annetut äänet lisäämällä taulukon 
  // indeksin eli [selected] kohtaan sille painetut äänet.
  const handleGiveVote = () => {
    // luodaan kopio alkuperäisestä taulukosta votes näin, jottei updatedVotes viittaa votes:iin
    const updatedVotes = [...votes]
    // muutetaan vain kopion updatedVotes arvoa  
    updatedVotes[selected] += 1
    // asetetaan uusi taulukko tilaksi, että ei muuteta alkuperäistä taulukkoa/tilaa 
    // suoraan joka on KIELLETTYÄ.
    setVotes(updatedVotes)
  }

  // Komponentti GetRandomInt (määriteltynä nuolifunktiolla) arpoo kokonaisluvun 0-7, 
  // koska muuttujassa updateIndex max arvoksi on annettu 8 eli se antaa kokonaisluvun joka 
  // on 8 pienempi.
  const GetRandomInt = (max) => {
    return Math.floor(Math.random() * max)
  }

  const MostAndFirst = () => {
    // Suurin äänimäärä maxVotes saadaan Math.max() staattisella metodilla apuna on myös 
    // spread operator (…), koska kyseessä on taulukko.
    const maxVotes = Math.max(...votes)
    console.log('suurin äänimäärä', maxVotes)
    // Taulukkometodi indexOf() palauttaa ensimmäisen indeksin, josta haettu elementti voidaan
    // löytää, tässä tapauksessa ensimmäisenä esiintyvän eniten ääniä saaneen anekdootin. 
    console.log('ekana esiintyvän eniten ääniä saaneen indeksi', votes.indexOf(maxVotes))
    // Palauttaa paragrafi/tulostuksena anecdotes-taulukosta ekana esiintyvän eniten ääniä 
    // saaneen anekdootin.
    return (
      <div>
        <p>{anecdotes[votes.indexOf(maxVotes)]}</p>
      </div>
    )
  }

  // {anecdotes[selected]} renderöi anecdotes-taulukon indeksissä [selected] olevan tekstin, 
  // kyseinen indeksi saadaan: GetRandomInt(8), joka antaa luvun 0-7, <br /> on rivinvaihto.
  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}<br />
      {/* tarvitaan toinen nappi äänestämistä varten, nimetään se >vote<, kun nappia painaa 
       eli tapahtuu tapahtuma onClick, sille tapahtumalle on määritelty 
       tapahtumankäsittelijäfunktio {handleGiveVote}, jonka koodi ajetaan seuraavaksi */}
      <button onClick={handleGiveVote}>vote</button>
      {/* kun nappia >next anecdote< painetaan, tapahtuman seurauksena se käsitellään
       tapahtumankäsittelijäfunktiossa {handleNextRandom} */}
      <button onClick={handleNextRandom}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <MostAndFirst />
    </div>
  )
}

export default App
