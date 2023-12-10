
import { use, useEffect, useRef, useState } from 'react';
import classes from './contact-form.module.css';
import Notification from '../ui/notification';

const sendContactData = async (contactDetails) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
}

const ContactForm = () => {

  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const messageInputRef = useRef();
  const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const sendMessageHandler = async (event) => { 
    event.preventDefault();
    // optional: add client-side validation
    // send data to API route
    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredMessage = messageInputRef.current.value;

    const reqBody = {
      email: enteredEmail,
      name: enteredName,
      message: enteredMessage
    }

    
    setRequestStatus('pending');
    try {
      await sendContactData(reqBody);
      setRequestStatus('success');
    } catch (error) {
      setRequestStatus('error');
    }
    
    emailInputRef.current.value = '';
    nameInputRef.current.value = '';
    messageInputRef.current.value = '';
  }

  let notification;
  if (requestStatus === 'pending') {
    // show pending notification
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way!'
    }
  }
  
  if (requestStatus === 'success') {
    // show success notification
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent successfully!'
    }
  }
  
  if (requestStatus === 'error') {
    // show error notification
    notification = {
      status: 'error',
      title: 'Error!',
      message: 'Message failed to send!'
    }
  }

  return (
    <>
      <section className={classes.contact}> 
        
        <h1>How can I help you?</h1>
        <form className={classes.form} onSubmit={sendMessageHandler}>
          <div className={classes.controls}>
            <div className={classes.control}>
              <label htmlFor='email'>Your Email</label>
              <input type='email' id='email' required ref={emailInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor='name'>Your Name</label>
              <input type='text' id='name' required ref={nameInputRef}/>
            </div>
          </div>
          <div className={classes.control}>
            <label htmlFor='message'>Your Message</label>
            <textarea id='message' rows='5' required ref={messageInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button>Send Message</button>
          </div>
        </form>
      { requestStatus && (
        <Notification 
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      </section>

    </>
  )
}

export default ContactForm;