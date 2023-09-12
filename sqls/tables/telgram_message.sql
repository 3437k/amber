-- DROP TABLE IF EXISTS telegram_messages;

CREATE TABLE public.telegram_messages (
  pid SERIAL4 NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  update_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  message_id VARCHAR(50) NOT NULL,
  sender_id VARCHAR(50) NOT NULL,
  sender_username VARCHAR(50) NOT NULL,
  recipient_id VARCHAR(50) NOT NULL,
  recipient_username VARCHAR(50) NOT NULL, 
  message_text VARCHAR(255) NOT NULL,
  is_sent INT NOT NULL DEFAULT 0,
  sent_at VARCHAR(20) NOT NULL DEFAULT NOW(), -- timestamp 1694504306
  CONSTRAINT pid_pkey PRIMARY KEY (pid)
);

-- sender_username 열에 인덱스 추가
CREATE INDEX idx_sender_username ON public.telegram_messages (sender_username);

-- recipient_username 열에 인덱스 추가
CREATE INDEX idx_recipient_username ON public.telegram_messages (recipient_username);

-- sent_at 열에 인덱스 추가
CREATE INDEX idx_sent_at ON public.telegram_messages (sent_at);

-- is_sent 열에 인덱스 추가
CREATE INDEX idx_is_sent ON public.telegram_messages (is_sent);


COMMENT ON TABLE public.telegram_messages IS '텔레그램 메세지 전송 기록';

COMMENT ON CONSTRAINT pid_pkey ON public.telegram_messages IS '텔레그램 메시지 기본 키';

COMMENT ON COLUMN public.telegram_messages.pid IS '메시지 ID';
COMMENT ON COLUMN public.telegram_messages.created_at IS '메시지 생성 일자';
COMMENT ON COLUMN public.telegram_messages.update_at IS '메시지 업데이트 일자';
COMMENT ON COLUMN public.telegram_messages.sender_username IS '메시지 보낸 사용자 이름';
COMMENT ON COLUMN public.telegram_messages.recipient_username IS '메시지 수신자 사용자 이름';
COMMENT ON COLUMN public.telegram_messages.message_text IS '전송한 메시지 텍스트';
COMMENT ON COLUMN public.telegram_messages.is_sent IS '메시지 전송 여부 (0: 미전송, 1: 전송)';
COMMENT ON COLUMN public.telegram_messages.sent_at IS '메시지 전송 일시 타임스탬프';
