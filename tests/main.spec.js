import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import { search, searchAlbuns, searchArtists, searchTracks, searchPlaylists } from '../src/main';


describe('Spotify Wrapper', () => {

  describe('smopke tests', () => {

    // serach (genérico) - = de 1 tipo
    // searchAlbuns
    // searchArtists
    // searchTracks
    // searchPlaylists

    it('should exist the search method', () => {
      expect(search).to.exist;
    })

    it('should exist the searchAlbuns method', () => {
      expect(searchAlbuns).to.exist;
    })

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    })

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    })

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    })

  });

  describe('Generic Search', () => {
    let fetchedStub;
    
    beforeEach( () => {
      fetchedStub = sinon.stub(global, 'fetch');
    });
    
    afterEach( () => {
      fetchedStub.restore(); 
    });
    
    it('Should call fech function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });
    
    it('should call fetch with the correct url', () => {
      
      context('passing one type', () => {
        const artists = search('Incubus','artist');

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

        const albuns = search('Incubus','album');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');

      });
      
      context('passing more than one type', () => {
        const artistsAndAlbums = search('Incubus',['artist','album']);
        
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
      });
      
    });
    
  });
  
});
