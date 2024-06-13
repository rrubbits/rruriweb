"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import Loading from '@/app/loading';
import { dateStringFrom, isoStringFromDate, localedDateStringFrom, timeStringFrom } from '@/utils/date';
// import { CreatePostDto, addPost } from '../../_actions/post';
import { CreatePostDto, addPost } from '@/app/_actions/posts';
import { revalidatePath } from 'next/cache';
import { isoStringFrom } from '../_utils/date';

type CreatePostProps = {
  onSubmit?: (post: CreatePostDto) => void
}
let defaultDto = {
  title: '',
  content: '',
  timestamp_begin: isoStringFromDate(new Date()),
  ticket_url: '',
  location: '',
}
export default function CreatePost({ onSubmit }: CreatePostProps) {
    const [text, setText] = useState('');
    const [result, setResult] = useState<CreatePostDto|null>(defaultDto);
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const parseText = async (event: any) => {
      setLoading(true)
      event.preventDefault();
      try {
        const response = await fetch('/admin/api/post', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text }),
          });
          const data = await response.json();
          console.log("[response], data");
          setResult({
            title: data.title,
            content: data.content,
            timestamp_begin: data.timestamp_begin,
            timestamp_end: data.timestmap_end,
            ticket_url: data.ticketLinks?.length > 0 ? data.ticketLinks[0] : undefined, //JSON.stringify(data.ticketLinks) : undefined,
            location: data.location,
          })
      
      }
      catch(e) {
        console.log(e)
      }
      finally {
        setLoading(false)
      }
    }
    const handleSubmit = async (event: any) => {
        setLoading(true)
        event.preventDefault();
        // console.log("[text]", text)
        try {
          console.log("[handleSubmit]", result)
          await addPost(result!)
          router.refresh()
          if(onSubmit) {
            onSubmit!(result!)
          }
        }
        catch(e) {
          console.log(e)
        }
        finally {
          setLoading(false)
        }
      };

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
          {result && (
            <div className="flex-1 m-1 space-y-2">
              <div>
                <label className='block text-gray-700 text-sm font-bold'>Title</label>
                <input className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          type="text" 
                          name="title" 
                          value={result.title} 
                          onChange={(e) => setResult({...result, title: e.target.value})}
                />
              </div>
              <div>
                <label className='block text-gray-700 text-sm font-bold'>Date</label>
                <div className="flex flex-row space-x-4">
                  <div className="flex-1">
                    <input className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        type="date" 
                        name="date" 
                        value={dateStringFrom(result.timestamp_begin)} 
                        // required pattern="\d{4}/\d{2}/\d{2}"
                        onChange={(e) => setResult({...result, 
                            timestamp_begin: isoStringFrom(e.target.value, timeStringFrom(result.timestamp_begin))
                          })} 
                    />
                  </div>
                  <div className="flex-1">
                    {/* <label className='block text-gray-700 text-sm font-bold'></label> */}
                    <input className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        type="time" 
                        name="time" 
                        value={timeStringFrom(result.timestamp_begin)} 
                        // required pattern="\d{4}/\d{2}/\d{2}"
                        onChange={(e) => setResult({...result, 
                            timestamp_begin: isoStringFrom(dateStringFrom(result.timestamp_begin), e.target.value)
                          })} 
                    />
                  </div>
                </div>

              </div>  

              {/* <p><strong>Date:</strong> {localedDateStringFrom(result.timestamp_begin)} {timeStringFrom(result.timestamp_begin)}</p> */}
              <div>
                <label className='block text-gray-700 text-sm font-bold'>Location</label>
                <input className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          type="text" 
                          name="location" 
                          value={result.location} 
                          onChange={(e) => setResult({...result, location: e.target.value})}
                />
              </div>
              <div>
                <label className='block text-gray-700 text-sm font-bold'>Ticket Url</label>
                <input className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          type="text" 
                          name="ticket_url" 
                          value={result.ticket_url} 
                          onChange={(e) => setResult({...result, ticket_url: e.target.value})}
                />
              </div>
              <div>
                <label className='block text-gray-700 text-sm font-bold'>Content</label>
                <textarea className='min-h-40 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          // type="text" 
                          name="ticket_url" 
                          value={result.content} 
                          onChange={(e) => setResult({...result, content: e.target.value})}
                />
              </div>
              {/* <p><strong>Ticket Links:</strong></p>
              <ul>
                {result.ticket_url}
              </ul> */}
                {/* ticketLinks.map((link, index) => (
                  <li key={index}><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></li>
                ))} */}
            </div>
          )}
        </div>
        {loading ? (
            <Loading />
          ) : 
          (<div className="w-full flex flex-row">
            <button className="flex-grow p-4" onClick={(e) => parseText(e)}>Parse Text</button>
            {result &&
              <button className="flex-grow p-4 bg-slate-200 hover:bg-slate-400 rounded-md m-4" type="submit">Submit</button>
            }
          </div>)}

        {/* {result ? <button className="p-4 bg-slate-200 rounded-md m-4" type="submit">Parse Text</button>  */}
         {/* : <button className="p-4 bg-slate-200 rounded-md m-4" type="submit">Parse Text</button>} */}
      </form>

    </div>
  );
}