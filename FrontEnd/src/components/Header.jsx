/* eslint-disable react-hooks/set-state-in-effect */


import { useState, useEffect } from 'react';

export default function Header({ title, children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
          </div>
        </div>
      </div>
    </header>
  );
}

