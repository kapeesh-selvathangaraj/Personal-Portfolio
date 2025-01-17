# How to Rollback Code Changes

If you need to rollback changes in your React portfolio project, here are the recommended approaches using Git:

## 1. If changes haven't been committed yet

To discard all local changes and revert to the last commit:
```bash
git restore .
```

Or for specific files:
```bash
git restore [filename]
```

## 2. If changes have been committed but not pushed

To undo the most recent commit while keeping your changes:
```bash
git reset --soft HEAD~1
```

To undo the most recent commit and discard changes:
```bash
git reset --hard HEAD~1
```

## 3. If changes have been pushed to GitHub

To revert to a specific commit:
1. Find the commit hash you want to go back to:
```bash
git log
```

2. Then reset to that commit:
```bash
git reset --hard [commit-hash]
```

3. Force push the changes (only if you're sure!):
```bash
git push -f origin main
```

## 4. Using GitHub Interface

You can also rollback changes directly from GitHub:
1. Go to your repository
2. Click on "Commits"
3. Find the commit you want to revert to
4. Click the "..." button and select "Revert"

## Important Notes

- Always make sure you have a backup or are certain about rolling back
- If working with others, communicate before force pushing
- Consider creating a new branch before making major changes

## Need Help?

If you need more specific help with rolling back, please provide:
1. What changes you want to undo
2. Whether the changes are committed/pushed
3. The specific commit or date you want to roll back to