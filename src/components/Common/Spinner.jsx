import React from 'react';
import './styles.scss';
import spinnerImg from '../../assets/image/spinner.gif';


const Spinner = ({ spinnerClass }) => {
    const computedSpinnerClass = spinnerClass ? `spinner ${spinnerClass}` : 'spinner';
    return (
        <div className={computedSpinnerClass}>
            <img src={spinnerImg} alt="Loading" />
        </div>
    );
}

export default Spinner;
