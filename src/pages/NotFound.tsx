import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="notfound-page">
            <div className="notfound-content">
                <div className="notfound-code">404</div>
                <div className="notfound-line" />
                <h1>Page introuvable</h1>
                <p>
                    La page que vous cherchez n'existe pas ou a été déplacée.<br />
                    Retournez à l'accueil et continuez à créer.
                </p>
                <div className="notfound-actions">
                    <Link to="/" className="btn-teal">← Retour à l'accueil</Link>
                    <Link to="/editor" className="btn-outline-dark">Ouvrir l'éditeur</Link>
                </div>
                <div className="notfound-bg-text">404</div>
            </div>
        </div>
    );
};

export default NotFound;
