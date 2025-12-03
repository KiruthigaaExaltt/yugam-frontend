
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./midCard.css";
import { FiArrowRight } from "react-icons/fi";

const MidCard = ({ icon, title, badge, description }: any) => {
    console.log(icon, title)
    return (
        <Card className="feature-card">
            <div className="card-header">
                <div className="left">
                    <div className="icon">{icon}</div>
                    <h3 className="title">{title}</h3>
                </div>

                {badge && <span className={`badge ${badge.toLowerCase()}`}>{badge}</span>}
            </div>

            <p className="description">{description}</p>

            <Button
                label="Try Demo"
                icon={<span className="p-button-icon p-button-icon-right"><FiArrowRight /></span>}
                className="p-button-text demo-button"
            />
        </Card>

    );
};

export default MidCard;
