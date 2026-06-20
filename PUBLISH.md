# Publish To GitHub Pages

This folder is ready to publish as a standalone GitHub Pages site.

First, refresh GitHub auth:

```powershell
gh auth login -h github.com -w -s repo
```

Then publish:

```powershell
gh repo create Salinator513/grindwave-jukebox --public --source . --remote origin --push --description "GRINDWAVE pixel radio jukebox"
gh api --method POST "repos/Salinator513/grindwave-jukebox/pages" -f "source[branch]=main" -f "source[path]=/"
gh api "repos/Salinator513/grindwave-jukebox/pages" --jq ".html_url"
```

Expected public URL:

```text
https://salinator513.github.io/grindwave-jukebox/
```
