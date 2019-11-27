import React from 'react';

function ColorTest () {
    return (
        <div class="color-test">
            <header>
                <h1 className="page-title">SanghaNet</h1>
                <div className="search-bar-grid">
                    <div></div>
                    <input type="text"/>
                </div>
                <nav>
                    <a>HOME</a>
                    <a>PROFILE</a>
                    <a>STATS</a>
                </nav>
                <div>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>
            </header>
        </div>
    )
}

export default ColorTest;
