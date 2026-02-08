'use client'

import {useState} from 'react'

const BookEvent = () => {

    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you can handle the email submission logic, e.g., send it to an API
        setTimeout(() => {
            setSubmitted(true);
        },1000);
       
    }

  return (
    <div id='book-event'>
        {submitted ? (
            <p className='text-sm'>Thanks for signing up!</p>
            ):(
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <button type='submit' className='button-submit'>Submit</button>
                </form>
            )}
      
    </div>
  )
}

export default BookEvent
