const logger = require('../config/logger');

function redact(body) {
  if (!body || typeof body !== 'object') return body;
  const copy = { ...body };
  if (copy.password !== undefined) copy.password = '[REDACTED]';
  return copy;
}

function requestLogger(req, res, next) {
  const start = Date.now();
  const payload = redact(req.body);
  const payloadObj = payload && typeof payload === 'object' ? payload : {};
  logger.info('request', {
    method: req.method,
    url: req.originalUrl || req.url,
    payload: Object.keys(payloadObj).length ? payloadObj : undefined,
    query: Object.keys(req.query || {}).length ? req.query : undefined
  });

  res.on('finish', () => {
    const duration = Date.now() - start;
    const meta = {
      method: req.method,
      url: req.originalUrl || req.url,
      statusCode: res.statusCode,
      durationMs: duration
    };
    if (res.statusCode >= 200 && res.statusCode < 300) {
      logger.info('response', meta);
    } else {
      logger.error('response', meta);
    }
  });

  next();
}

module.exports = requestLogger;
