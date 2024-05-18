"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import Loading from '@/app/loading';
export default function CreatePost() {
    const [text, setText] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const handleSubmit = async (event: any) => {
        setLoading(true)
        event.preventDefault();
        // console.log("[text]", text)
        try {
          const response = await fetch('/admin/api/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
            });
            const data = await response.json();
            setResult(data);
            router.refresh()    
        }
        catch(e) {
          console.log(e)
          setLoading(false)
        }
    };
    console.log("[result]", result)

  return (
    <div>
      <h1>Text Parser</h1>
      <form className="flex flex-col p-10" onSubmit={handleSubmit}>
        <div className="flex flex-row">
          <textarea className="h-[50vh] flex-1 m-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
          //   rows="10"
          //   cols="50"
            placeholder="Enter the text to parse"
          ></textarea>
          {/* {result && (
            <div className="flex-1 m-1">
              <h2>Result</h2>
              <p><strong>Title:</strong> {result.title}</p>
              <p><strong>Date:</strong> {result.date}</p>
              <p><strong>Location:</strong> {result.location}</p>
              
              <p><strong>Opening Time:</strong> {result.openingTime}</p>
              <p><strong>Starting Time:</strong> {result.startingTime}</p>
              <p><strong>Ticket Links:</strong></p>
              <ul>
                {result.ticketLinks.map((link, index) => (
                  <li key={index}><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></li>
                ))}
              </ul>
            </div>
          )} */}
        </div>
        {loading ? (
            <Loading />
          ) : (
        <button className="p-4 bg-slate-200 hover:bg-slate-400 rounded-md m-4" type="submit">Submit</button>)}

        {/* {result ? <button className="p-4 bg-slate-200 rounded-md m-4" type="submit">Parse Text</button>  */}
         {/* : <button className="p-4 bg-slate-200 rounded-md m-4" type="submit">Parse Text</button>} */}
      </form>

    </div>
  );
}