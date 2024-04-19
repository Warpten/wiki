module.exports = (md) => {
  const oldFenceRule = md.renderer.rules.fence
  md.renderer.rules.fence = (tokens, idx, opts, env, slf) => {
    let result = oldFenceRule(tokens, idx, opts, env, slf)
    // Slice out the two outer HTML tags
    let startIndex = result.indexOf('>', 5) + 1 // Because starts with `<pre><code ...`

    let startMarker = result.substring(0, startIndex)
    if (startMarker.startsWith("<pre><code class=\"language-")) {
      let codeFragment = result.substring(startIndex, result.length - '</code></pre>'.length)

      const oldHtml = md.options.html
      md.options.html = true
      result = startMarker + md.renderInline(codeFragment, env) + '</code></pre>'
      md.options.html = oldHtml
    }

    return result
  }
}
