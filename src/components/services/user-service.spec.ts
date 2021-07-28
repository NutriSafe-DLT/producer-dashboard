import React from 'react';
import userService from './user-service';


describe('Testing user service', ()=>{
    it('should be in offline mode as dev', ()=> {
        const mode =  userService.isInOfflineMode();
        expect(mode).toBeTruthy();
    });
});