import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Victoria Minets</p>
          <p>
            Contact us:&nbsp;
            <a href="mailto:anni.nicht@gmail.com">anni.nicht@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
