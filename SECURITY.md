# Security

The package renders TreeSpec prompts and choice labels as React text nodes. Hosts are responsible for:

- authenticating learners and authorizing TreeSpec content;
- validating TreeSpec payloads before creating a session;
- persisting and validating decisions server-side when the session is remote;
- avoiding unsafe custom HTML renderers for untrusted prompt or choice content.
