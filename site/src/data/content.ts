const TREE = 'https://github.com/YagnikSharma/IBM_Db2_TechX_Project_Submission/tree/submission/neighbourhood-safety-intelligence-network/submissions/neighbourhood-safety-intelligence-network';
const BLOB = TREE.replace('/tree/', '/blob/');
export const LINKS = {
  repo: TREE,
  site: 'https://github.com/YagnikSharma/IBM_Db2_TechX_Project_Submission_neighbourhood-safety-intelligence-network_deployment_repo',
  apk: '/downloads/nsin-android.apk',
  hackathon: 'https://ibmdb2techxsummit.glbajajgroup.ac.in/',
  app: '/app/',
};
// Film links: set when the new demo films are published.
export const FILMS = { landscape: '', reel: '' };
export const DOCS = [
  { title: "Judge's guide", text: 'Evaluate NSIN in 5 minutes. Every judging criterion mapped to evidence.', href: BLOB + '/docs/JUDGES_GUIDE.md' },
  { title: 'Architecture', text: 'Components, data flow, Db2 schema and deployment, with diagrams.', href: BLOB + '/architecture.md' },
  { title: 'Db2 deep dive', text: 'VECTOR columns, VECTOR_DISTANCE, SQL analytics, JSON filters and least privilege.', href: BLOB + '/docs/DB2_DEEP_DIVE.md' },
  { title: 'AI design', text: 'Granite agents, CrewAI flow, Haystack hybrid search and LangChain DB2VS.', href: BLOB + '/docs/AI_DESIGN.md' },
  { title: 'Security', text: 'Threat model, auth, PII handling, Bandit and pip-audit results.', href: BLOB + '/docs/SECURITY.md' },
  { title: 'Innovation', text: 'What is new here, and why it matters for neighbourhoods.', href: BLOB + '/docs/INNOVATION.md' },
  { title: 'Live demo', text: 'How this page runs the real app: Vercel, live.json and a secure tunnel.', href: BLOB + '/docs/LIVE_DEMO.md' },
  { title: 'Testing', text: '78 integration tests against a real Db2 and real models. No mocks.', href: BLOB + '/docs/TESTING.md' },
];

export const STATS = [
  { value: 78, suffix: "", label: "integration tests passing on IBM Db2" },
  { value: 96, suffix: "%", label: "backend line coverage, no mocks" },
  { value: 3, suffix: "", label: "IBM Db2 AI packages in production code" },
  { value: 0, suffix: "", label: "cloud AI calls: Granite runs locally" },
];

export const PROBLEMS = [
  { tag: "No priority", text: "An SOS and a lost-parcel message land in the same group chat. Nothing says what matters first." },
  { tag: "No status", text: "Did anyone respond? Is help on the way? The answer is buried somewhere in the scrollback." },
  { tag: "No record", text: "No timeline, no accountability, and no data to make the next response faster." },
];

export const FLOW = [
  { step: "01", title: "Raise it", text: "Two-step SOS or a free-text report from web or Android. GPS, location and contacts attached.", sql: "INSERT incident + location + history + audit  -- one Db2 transaction" },
  { step: "02", title: "Triage it", text: "A CrewAI flow classifies the report and sets a priority. Critical reports take an escalation branch.", sql: "intake → assess → router → escalate | standard" },
  { step: "03", title: "Ground it", text: "Hybrid search over approved protocols stored in Db2 cites the exact passage, and Granite agents write the briefing.", sql: "VECTOR_DISTANCE(embedding, :q, COSINE)  ‖  BM25" },
  { step: "04", title: "Act on it", text: "Verified responders claim it, related reports are linked, and every step lands in an append-only history.", sql: "MEDIAN · PERCENTILE_CONT(0.9) · RANK() OVER" },
];

export const DB2_FEATURES = [
  { title: "Vectors inside Db2", text: "Protocol passages and incident reports are stored with VECTOR(768) columns and searched with VECTOR_DISTANCE.", code: "SELECT id, VECTOR_DISTANCE(embedding,\n  VECTOR(?, 768, FLOAT32), COSINE) AS d\nFROM nsin_protocol_passages\nORDER BY d FETCH FIRST 3 ROWS ONLY" },
  { title: "Analytics in SQL", text: "Median and 90th-percentile response times per priority, hotspots and SLA breaches are computed by Db2, not in Python.", code: "MEDIAN(DOUBLE(SECONDS_BETWEEN(a.ack_at, i.created_at)))\nPERCENTILE_CONT(0.9) WITHIN GROUP (...)\nRANK() OVER (ORDER BY COUNT(*) DESC)" },
  { title: "JSON metadata filters", text: "Passage metadata is stored as BSON and filtered by category and audience with JSON_VALUE.", code: "WHERE JSON_VALUE(SYSTOOLS.BSON2JSON(meta),\n  '$.audience' RETURNING VARCHAR(1000)) = ?" },
  { title: "Least privilege", text: "The app can run as a data-only Db2 role. The audit table is append-only, and DDL is denied (proven by tests).", code: "GRANT SELECT, INSERT, UPDATE, DELETE\n  ON TABLE incidents TO ROLE NSIN_APP;\nREVOKE UPDATE, DELETE ON audit_events ..." },
];

export const AI_STACK = [
  { pkg: "ibm-db-haystack", fw: "Haystack", text: "IBMDb2DocumentStore + IBMDb2EmbeddingRetriever, fused with BM25 by DocumentJoiner. Every answer cites its passage." },
  { pkg: "crewai-tools", fw: "CrewAI", text: "IBM's DB2VectorSearchTool lets the Protocol Advisor agent search Db2 itself. A CrewAI Flow routes critical reports." },
  { pkg: "langchain-db2", fw: "LangChain", text: "DB2VS stores incident vectors so responders see duplicate and related reports before they dispatch." },
  { pkg: "Ollama · IBM Granite", fw: "Local models", text: "granite3.3:2b for the agents, granite-embedding:278m for vectors. Resident data never leaves the machine." },
];

export const RUN_STEPS = [
  { title: "Get a Db2", text: "Create a free instance with the IBM Db2 VS Code extension, or use the bundled container.", code: "docker compose --profile bundled-db2 up" },
  { title: "Pull Granite", text: "Two local IBM Granite models through Ollama.", code: "ollama pull granite3.3:2b\nollama pull granite-embedding:278m" },
  { title: "Run NSIN", text: "One command builds the API and the web app.", code: "DB2_PASSWORD=*** docker compose up --build" },
];
