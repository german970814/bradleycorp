```jsx
<h1
  style={{
    paddingTop: '10px',
    paddingBottom: '10px'
  }} >
  YouTube
</h1>
<div
  style={{
    paddingTop: '10px',
    paddingBottom: '10px'
  }}>
  (See PROPS & METHODS for link to available player configurations)
</div>
<BCorpVideo
  url={'https://www.youtube.com/embed/Pcf_k81ACfc'}
  youtubeProps={{
    opts: {
      playerVars: {
        showinfo: 0,
        modestbranding: 1,
        controls: 1
      }
    }
  }}
/>
<h1
style={{
    paddingTop: '25px',
    paddingBottom: '10px'
  }}>
  Vimeo
</h1>
<div
  style={{
    paddingTop: '10px',
    paddingBottom: '10px'
  }}>
  Note: this is much buggier here than on actual site, hidden for now.
</div>
<div
  style={{
    paddingTop: '10px',
    paddingBottom: '10px'
  }}>
  (See PROPS & METHODS for link to available player configurations)
</div>
```
