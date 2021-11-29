import React, {useState, useEffect} from 'react'
import Modal from 'react-modal';
import Heading from './Heading';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  

const Dialog = ({title, children, open = false}) => {
    const [modalIsOpen, setIsOpen] = useState(open);

    useEffect(() => {
        setIsOpen(open);
    }, [open])

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            contentLabel={title}
            style={customStyles}
        >
            {
                title &&
                <header>
                    <Heading level={2}>
                        {title}
                    </Heading>
                </header>
            }

            <article>
                {children}
            </article>

            <footer>
                <button onClick={() => setIsOpen(false)}>close</button>
            </footer>

        </Modal>
    )
}

export default Dialog
