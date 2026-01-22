import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { FiEye, FiCopy, FiTrash2 } from 'react-icons/fi';
import './templateCard.css';

interface TemplateCardProps {
    title?: string;
    category?: string;
    description?: string;
    createdBy?: string;
    date?: string;
    onDelete?: () => void;
    onPreview?: () => void;
    onUseTemplate?: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
    title,
    category,
    description,
    createdBy,
    date,
    onDelete,
    onPreview,
    onUseTemplate
}) => {
    return (
        <Card className="template-card hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-start mb-2">
                <div>
                    {title && <h3 className="template-card-title">{title}</h3>}
                    {category && <span className="template-card-category">{category}</span>}
                </div>
                <div className="flex items-center gap-2">
                    {category && (
                        <div className="template-category-badge">
                            {category}
                        </div>
                    )}
                    {onDelete && (
                        <button onClick={onDelete} className="template-delete-btn">
                            <FiTrash2 size={16} />
                        </button>
                    )}
                </div>
            </div>

            {description && <p className="template-card-description">{description}</p>}

            <div className="flex justify-between items-center mt-4 mb-4">
                {createdBy && (
                    <span className="template-card-created">
                        Created by: <span className="font-semibold">{createdBy}</span>
                    </span>
                )}
                {date && <span className="template-card-date">{date}</span>}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-auto">
                <Button
                    label="Preview"
                    icon={<FiEye size={16} />}
                    onClick={onPreview}
                    className="p-button-outlined template-preview-btn"
                />
                <Button
                    label="Use Template"
                    icon={<FiCopy size={16} />}
                    onClick={onUseTemplate}
                    className="template-use-btn"
                />
            </div>
        </Card>
    );
};

export default TemplateCard;
