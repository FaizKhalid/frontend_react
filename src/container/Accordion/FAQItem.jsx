import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

export const FAQItem = ({ curData, isActive, onToggle }) => {
  const { question, answer } = curData;

  return (
    <li className="faq-item">
      <div className="accordion-grid">
        <p className="accordion-question">{question}</p>
        <motion.button
          onClick={onToggle}
          className="toggle-btn"
          animate={{
            rotate: isActive ? 180 : 0,
            scale: isActive ? 1.1 : 1,
            backgroundColor: isActive ? "#181818" : "#007bff",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {isActive ? <HiX size={24} /> : <HiMenuAlt4 size={24} />}
        </motion.button>
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={isActive ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="answer-wrapper"
      >
        <p className="answer"><span>Answer:</span> {answer}</p>
      </motion.div>
    </li>
  );
};
