import React from 'react';
import "./HelpDesk.css"; // Make sure you have a corresponding CSS file for styling

const HelpDesk = () => {
    return (
        <div className="subgrid-two-item grid-common grid-c8">
            <div className="grid-c-title">
                <h3 className="grid-c-title-text">Help Desk 👋</h3>
            </div>
            <div className="grid-c8-content">
                <p className="text text-silver-v1" style={{ marginBottom: 30 }}>
                    If you're experiencing any issues or need assistance, please don't hesitate to get in touch with our admin. You can reach out via email or phone for prompt support:
                </p>
                <p className="text text-silver-v1">Email: <a href="mailto:obazuaye55@gmail.com" style={{ color: 'var(--clr-pumpkin)' }}>obazuaye55@gmail.com</a></p>
                <p className="text text-silver-v1">Phone: <a href="tel:+13065154795" style={{ color: 'var(--clr-pumpkin)' }}>306-515-4795</a></p>
            </div>
        </div>
    );
}

export default HelpDesk;
