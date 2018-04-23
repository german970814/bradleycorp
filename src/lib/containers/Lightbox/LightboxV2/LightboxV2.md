```js
<LightboxV2
  renderChildren={openLightbox => {
    return <button onClick={openLightbox}>Click me to open lightbox</button>
  }}
  renderLightboxContents={() => {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          textAlign: 'center'
        }}>
        {
          'Im a div making clear the lightbox size. The lightbox currently snaps to my size. Click anywhere outside the lightbox to close. Have a play with the style of this content element and the lightbox props'
        }
      </div>
    )
  }}
  fitLightboxToContent
  fullWidth={true}
  maxWidth={'500px'}
/>
```
