# Improvement loop ledger

Append-only record of loop runs. Every block appends one entry:

```
## <YYYY-MM-DD HH:MM> · block <n>/<total> · <agent>
- Item: <TODO item taken>
- Result: <done | partial | skipped — why>
- Commits: <shas or none>
- Follow-ups: <new TODO items added, if any>
```

No entries yet — first loop will start below.

---
