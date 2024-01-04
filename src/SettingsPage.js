import React from 'react';
import ReactSlider from 'react-slider';
import './slider.css';

import SettingsContext from './SettingsContext';
// import BackButton from './BackButton';
import {useContext} from "react";

function SettingsPage({ setShowSettings, resetTimer }) {

  const settingsInfo = useContext(SettingsContext);

  return(
    <div className="settings-page">
      <div style={{textAlign:'left'}}>
        <label>work: {settingsInfo.workMinutes}:00</label>
          <ReactSlider 
            className={'slider'}
            thumbClassName={'thumb'}
            trackClassName={'track'}
            value={settingsInfo.workMinutes}
            onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
            min={1}
            max={99}
          />
        <label>break: {settingsInfo.breakMinutes}:00</label>
          <ReactSlider 
            className={'slider'}
            thumbClassName={'thumb'}
            trackClassName={'track'}
            value={settingsInfo.breakMinutes}
            onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
            min={1}
            max={99}
          />
        <button onClick={() => { setShowSettings(false); resetTimer(); }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;